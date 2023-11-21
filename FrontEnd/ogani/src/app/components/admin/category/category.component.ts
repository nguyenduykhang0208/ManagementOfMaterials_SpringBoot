import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/_service/category.service';
import { StorageService } from 'src/app/_service/storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [MessageService],
})
export class CategoryComponent implements OnInit {
  listCategory: any;

  displayForm: boolean = false;

  deleteForm: boolean = false;

  onUpdate: boolean = false;

  userRole: any;

  submitted = false;

  categoryForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
    ]),
  });

  constructor(
    private messageService: MessageService,
    private categoryService: CategoryService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getListCategory();
    this.getUserRole();
  }

  getUserRole() {
    this.userRole = this.storageService.getUser().roles[0];
  }

  getListCategory() {
    this.categoryService.getListCategory().subscribe({
      next: (res) => {
        this.listCategory = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showForm() {
    this.submitted = false;
    this.onUpdate = false;
    this.categoryForm.setValue({
      id: 0,
      name: null,
    });
    this.displayForm = true;
  }

  onUpdateForm(id: number, name: string) {
    this.submitted = false;
    this.onUpdate = true;
    this.displayForm = true;
    this.categoryForm.setValue({
      id: id,
      name: name,
    });
  }

  onDelete(id: number, name: string) {
    this.deleteForm = true;
    this.categoryForm.setValue({
      id: id,
      name: name,
    });
  }

  createCategory() {
    this.submitted = true;
    const name = this.categoryForm.get('name')?.value || '';
    if (this.categoryForm.valid) {
      this.categoryService.createCategory(name).subscribe({
        next: (res) => {
          this.getListCategory();
          this.showSuccess('Tạo danh mục thành công!');
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

  updateCategory() {
    this.submitted = true;
    const id = this.categoryForm.get('id')?.value || 0;
    const name = this.categoryForm.get('name')?.value || '';
    if (this.categoryForm.valid) {
      this.categoryService.updateCategory(id, name).subscribe({
        next: (res) => {
          this.getListCategory();
          this.showSuccess('Cập nhật danh mục thành công!');
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

  enableCategory(id: number) {
    this.categoryService.enableCategory(id).subscribe({
      next: (res) => {
        this.getListCategory();
        this.showSuccess('Cập nhật thành công!!');
      },
      error: (err) => {
        this.showError(err.message);
      },
    });
  }

  deleteCategory() {
    this.submitted = true;
    const id = this.categoryForm.get('id')?.value || 0;
    if (this.categoryForm.valid) {
      this.categoryService.deleteCategory(id).subscribe({
        next: (res) => {
          this.getListCategory();
          this.showWarn('Xóa danh mục thành công!!');
          this.deleteForm = false;
          this.submitted = false;
        },
        error: (err) => {
          this.showError(err.message);
          this.submitted = false;
        },
      });
    }
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
