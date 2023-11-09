import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StorageService } from 'src/app/_service/storage.service';
import { SupplierService } from 'src/app/_service/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class SupplierComponent implements OnInit {
  listSupplier: any;

  displayForm: boolean = false;

  deleteForm: boolean = false;

  onUpdate: boolean = false;
  showDelete: boolean = false;
  userRole: any;

  supplierForm: any = {
    name: null,
    phone: null,
    address: null,
    email: null,
  };
  constructor(
    private messageService: MessageService,
    private supplierService: SupplierService,
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
    this.getListSupplier();
    this.getUserRole();
  }
  getUserRole() {
    this.userRole = this.storageService.getUser().roles[0];
  }
  onUpdateForm(data: any) {
    this.onUpdate = true;
    this.displayForm = true;
    this.supplierForm.id = data.id;
    this.supplierForm.name = data.name;
    this.supplierForm.phone = data.phone;
    this.supplierForm.address = data.address;
    this.supplierForm.email = data.email;
  }
  getListSupplier() {
    this.supplierService.getListSupplier().subscribe({
      next: (res) => {
        this.listSupplier = res;
        console.log(this.listSupplier);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  showForm() {
    this.onUpdate = false;
    this.supplierForm = {
      id: null,
      name: null,
    };
    this.displayForm = true;
  }
  createSupplier() {
    const { name, phone, address, email } = this.supplierForm;
    this.supplierService.createSupplier(name, phone, address, email).subscribe({
      next: (res) => {
        this.getListSupplier();
        this.showSuccess('Tạo nhà cung cấp mới thành công!');
        this.displayForm = false;
      },
      error: (err) => {
        this.showError(err.message);
      },
    });
  }
  updateSupplier() {
    const { id, name, phone, address, email } = this.supplierForm;
    this.supplierService
      .updateSupplier(id, name, phone, address, email)
      .subscribe({
        next: (res) => {
          this.getListSupplier();
          this.showSuccess('Cập nhật nhà cung cấp thành công!');
          this.displayForm = false;
        },
        error: (err) => {
          this.showError(err.message);
        },
      });
  }
  onDelete(id: number, name: string) {
    this.supplierForm.id = null;
    this.showDelete = true;
    this.supplierForm.id = id;
    this.supplierForm.name = name;
  }
  deleteSupplier() {
    this.supplierService.deleteSupplier(this.supplierForm.id).subscribe({
      next: (res) => {
        this.getListSupplier();
        this.showWarn('Xóa thành công');
        this.showDelete = false;
      },
      error: (err) => {
        this.showError(err.message);
      },
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
}
