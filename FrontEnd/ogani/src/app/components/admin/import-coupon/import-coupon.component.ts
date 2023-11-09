import { Component, OnInit } from '@angular/core';
import { importCouponData } from '../data/importCouponData';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/_service/storage.service';
import { MessageService } from 'primeng/api';
import { ImportCouponService } from 'src/app/_service/importcoupon.service';
import { SupplierService } from 'src/app/_service/supplier.service';
import { ProductService } from 'src/app/_service/product.service';
import { ImportCouponDetail } from 'src/app/_class/importcoupon_detail';
import { concatMap, from } from 'rxjs';

@Component({
  selector: 'app-import-coupon',
  templateUrl: './import-coupon.component.html',
  styleUrls: ['./import-coupon.component.css'],
  providers: [MessageService],
})
export class ImportCouponComponent implements OnInit {
  listImportCoupon: any;
  listDetail: any;
  listSupplier: any;
  listProduct: any;
  userId: any;
  userRole: any;

  deleteForm: boolean = false;
  showForm: boolean = false;
  showDetail: boolean = false;
  listDetailCreate: any = [];
  listImportCouponDetail: any[] = [];
  importCouponDetailForm: any = {
    product_id: null,
    quantity: null,
    unit_price: null,
  };
  importCouponForm: any = {
    supplier_id: null,
  };
  constructor(
    private router: Router,
    private storageService: StorageService,
    private messageService: MessageService,
    private importCouponService: ImportCouponService,
    private supplierService: SupplierService,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.getData();
    this.getUserId();
    this.getListSupplier();
    this.getListProduct();
    this.getUserRole();
  }

  getUserId() {
    this.userId = this.storageService.getUser().id;
  }

  getUserRole() {
    this.userRole = this.storageService.getUser().roles[0];
  }

  getData() {
    this.importCouponService.getListImportCoupon().subscribe({
      next: (res) => {
        this.listImportCoupon = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getListSupplier() {
    this.supplierService.getListSupplier().subscribe({
      next: (res) => {
        this.listSupplier = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getListProduct() {
    this.productService.getListProduct().subscribe({
      next: (res) => {
        this.listProduct = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  enableImportCoupon(id: number) {
    this.importCouponService.getListImportCouponDetail(id).subscribe({
      next: (res) => {
        this.listDetail = res;
        // this.listDetail.map((i: any) => {
        //   this.productService
        //     .updateQuantityProduct(i.product.id, i.quantity)
        //     .subscribe({
        //       next: (res) => {
        //         this.showSuccess('Cập nhật thành công!!');
        //       },
        //       error: (err) => {
        //         this.showError(err.message);
        //       },
        //     });
        // });
        from(this.listDetail)
          .pipe(
            concatMap((item: any) => {
              return this.productService.updateQuantityProduct(
                item.product.id,
                item.quantity
              );
            })
          )
          .subscribe({
            next: (res) => {
              this.showSuccess('Cập nhật thành công!!');
            },
            error: (err) => {
              this.showError(err.message);
            },
          });
        this.importCouponService.enableImportCoupon(id).subscribe({
          next: (res) => {
            this.getData();
            this.showSuccess('Cập nhật thành công!!');
          },
          error: (err) => {
            this.showError(err.message);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  toImportCouponDetail(id: string) {
    this.router.navigate(['/admin/import-coupon', id]);
  }
  openNew() {
    this.showForm = true;
    this.importCouponDetailForm = {
      product_id: null,
      quantity: null,
      unit_price: null,
    };
    this.importCouponForm = {
      user_id: null,
      supplier_id: null,
    };
    this.listDetailCreate = [];
  }
  onShowDetail() {
    this.showDetail = true;
    if (this.listDetailCreate == null) {
      this.importCouponDetailForm = {
        product_id: null,
        quantity: null,
        unit_price: null,
      };
    }
  }
  createNew() {
    const { supplier_id } = this.importCouponForm;
    for (const formData of this.listDetailCreate) {
      let importCouponDetail: ImportCouponDetail = new ImportCouponDetail();
      importCouponDetail.productId = Number(formData.product_id); // Chuyển đổi thành kiểu number
      importCouponDetail.quantity = Number(formData.quantity); // Chuyển đổi thành kiểu number
      importCouponDetail.unitPrice = Number(formData.unit_price); // Chuyển đổi thành kiểu number

      this.listImportCouponDetail.push(importCouponDetail);
    }
    // this.deleteDetail();
    this.importCouponService
      .createImportCoupon(
        this.userId,
        +supplier_id,
        this.listImportCouponDetail
      )
      .subscribe({
        next: (res) => {
          this.getData();
          this.showSuccess('Tạo phiếu nhập hàng thành công mới thành công!');
          this.showForm = false;
        },
        error: (err) => {
          this.showError(err.message);
        },
      });
  }
  addDetails() {
    this.onChangeProduct();
    this.listDetailCreate.push(this.importCouponDetailForm);
    this.importCouponDetailForm = {
      product_id: null,
      quantity: null,
      unit_price: null,
    };
  }
  saveDetails() {
    this.showDetail = false;
  }
  onDelete(id: string) {
    this.deleteForm = true;
    this.importCouponForm.id = id;
  }
  deleteDetail() {
    this.importCouponDetailForm = {
      product_id: null,
      quantity: null,
      unit_price: null,
    };
    this.listDetailCreate = [];
    this.showDetail = false;
  }
  deleteItemDetail(item: any) {
    const targetElement = item;
    const index = this.listDetailCreate.findIndex((element: any) => {
      return (
        element.product_id === targetElement.product_id &&
        element.quantity === targetElement.quantity &&
        element.unit_price === targetElement.unit_price
      );
    });
    if (index !== -1) {
      this.listDetailCreate.splice(index, 1);
    }
  }
  deleteImportCoupon(id: number) {
    this.importCouponService.deleteImportCoupon(id).subscribe({
      next: (res) => {
        this.getData();
        this.showWarn('Xóa phiếu nhập hàng thành công!!');
        this.deleteForm = false;
      },
      error: (err) => {
        this.showError(err.message);
      },
    });
  }

  onChangeProduct() {
    this.importCouponDetailForm.product_id =
      +this.importCouponDetailForm.product_id;
  }

  showSuccess(text: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: text,
    });
  }
  showError(text: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: text,
    });
  }

  showWarn(text: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: text,
    });
  }
  selectedSupplierId: any;
  onSupplierChange(event: any) {
    this.selectedSupplierId = event.target.value;
  }
  onProductChange(event: any) {}
}
