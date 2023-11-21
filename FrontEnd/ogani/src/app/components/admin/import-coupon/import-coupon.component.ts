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
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  submitted = false;
  importCouponId: any;
  // importCouponDetailForm: any = {
  //   product_id: null,
  //   quantity: null,
  //   unit_price: null,
  // };
  // importCouponForm: any = {
  //   supplier_id: null,
  // };

  importCouponDetailForm = new FormGroup({
    product_id: new FormControl(0, [Validators.required]),
    quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
    unit_price: new FormControl(0, [Validators.required, Validators.min(0)]),
  });
  importCouponForm = new FormGroup({
    id: new FormControl(0),
    supplier_id: new FormControl(0, [Validators.required]),
  });

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
    this.submitted = false;
    this.importCouponDetailForm.setValue({
      product_id: null,
      quantity: null,
      unit_price: null,
    });
    this.importCouponForm.patchValue({
      supplier_id: null,
    });
    this.listDetailCreate = [];
  }
  onShowDetail() {
    this.showDetail = true;
    this.submitted = false;
    if (this.listDetailCreate == null) {
      this.importCouponDetailForm.setValue({
        product_id: null,
        quantity: null,
        unit_price: null,
      });
    }
  }
  createNew() {
    this.submitted = true;
    // const { supplier_id } = this.importCouponForm;
    const supplier_id = this.importCouponForm.get('supplier_id')?.value || 0;
    for (const formData of this.listDetailCreate) {
      let importCouponDetail: ImportCouponDetail = new ImportCouponDetail();
      importCouponDetail.productId = Number(formData.product_id);
      importCouponDetail.quantity = Number(formData.quantity);
      importCouponDetail.unitPrice = Number(formData.unit_price);

      this.listImportCouponDetail.push(importCouponDetail);
    }
    // this.deleteDetail();
    if (this.importCouponForm.valid) {
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
            this.submitted = false;
          },
          error: (err) => {
            this.showError(err.message);
            this.submitted = false;
          },
        });
    }
  }
  addDetails() {
    this.submitted = true;
    if (this.importCouponDetailForm.valid) {
      // this.onChangeProduct();
      // this.listDetailCreate.push(this.importCouponDetailForm);
      const newDetail = { ...this.importCouponDetailForm.value };
      this.onChangeProduct();
      this.listDetailCreate.push(newDetail);
      this.importCouponDetailForm.setValue({
        product_id: null,
        quantity: null,
        unit_price: null,
      });
      this.submitted = false;
    }
  }
  saveDetails() {
    this.showDetail = false;
    this.submitted = false;
  }
  onDelete(id: number) {
    this.deleteForm = true;
    this.importCouponId = id;
    // this.importCouponForm.id = id;
    // this.importCouponForm.patchValue({
    //   id: id,
    // });
  }
  deleteDetail() {
    this.importCouponDetailForm.setValue({
      product_id: null,
      quantity: null,
      unit_price: null,
    });
    this.listDetailCreate = [];
    this.showDetail = false;
    this.submitted = false;
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
  deleteImportCoupon() {
    this.importCouponService.deleteImportCoupon(this.importCouponId).subscribe({
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
    // this.importCouponDetailForm.product_id =
    //   +this.importCouponDetailForm.product_id;
    this.importCouponDetailForm.patchValue({
      product_id: this.importCouponDetailForm.get('product_id')?.value || 0,
    });
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
