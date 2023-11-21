import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StorageService } from 'src/app/_service/storage.service';
import { SupplierService } from 'src/app/_service/supplier.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  submitted = false;

  supplierForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    phone: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
    ]),
  });
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
    this.supplierForm.setValue({
      id: data.id,
      name: data.name,
      phone: data.phone,
      address: data.address,
      email: data.email,
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
  showForm() {
    this.onUpdate = false;
    this.submitted = false;
    this.supplierForm.patchValue({
      id: 0,
      name: null,
    });
    this.displayForm = true;
  }
  createSupplier() {
    this.submitted = true;
    const name = this.supplierForm.get('name')?.value || '';
    const phone = this.supplierForm.get('phone')?.value || '';
    const address = this.supplierForm.get('address')?.value || '';
    const email = this.supplierForm.get('email')?.value || '';
    if (this.supplierForm.valid) {
      this.supplierService
        .createSupplier(name, phone, address, email)
        .subscribe({
          next: (res) => {
            this.getListSupplier();
            this.showSuccess('Tạo nhà cung cấp mới thành công!');
            this.displayForm = false;
            this.submitted = false;
          },
          error: (err) => {
            this.showError(err.message);
            this.submitted = false;
          },
        });
    }
  }
  updateSupplier() {
    this.submitted = true;
    const id = this.supplierForm.get('id')?.value || 0;
    const name = this.supplierForm.get('name')?.value || '';
    const phone = this.supplierForm.get('phone')?.value || '';
    const address = this.supplierForm.get('address')?.value || '';
    const email = this.supplierForm.get('email')?.value || '';
    if (this.supplierForm.valid) {
      this.supplierService
        .updateSupplier(id, name, phone, address, email)
        .subscribe({
          next: (res) => {
            this.getListSupplier();
            this.showSuccess('Cập nhật nhà cung cấp thành công!');
            this.displayForm = false;
            this.submitted = false;
          },
          error: (err) => {
            this.showError(err.message);
            this.submitted = false;
          },
        });
    }
  }
  onDelete(id: number, name: string) {
    this.supplierForm.patchValue({
      id: 0,
    });
    this.showDelete = true;
    this.supplierForm.patchValue({
      id: id,
      name: name,
    });
  }
  deleteSupplier() {
    const id = this.supplierForm.get('id')?.value || 0;
    this.supplierService.deleteSupplier(id).subscribe({
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
