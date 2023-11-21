import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StorageService } from 'src/app/_service/storage.service';
import { TagService } from 'src/app/_service/tag.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
  providers: [MessageService],
})
export class TagComponent implements OnInit {
  listTag: any;

  displayForm: boolean = false;

  deleteForm: boolean = false;

  onUpdate: boolean = false;

  userRole: any;

  submitted = false;

  tagForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private tagService: TagService,
    private messageService: MessageService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getList();
    this.getUserRole();
  }

  getUserRole() {
    this.userRole = this.storageService.getUser().roles[0];
  }

  getList() {
    this.tagService.getListTag().subscribe({
      next: (res) => {
        this.listTag = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showForm() {
    this.onUpdate = false;
    this.submitted = false;
    this.tagForm.setValue({
      id: 0,
      name: null,
    });
    this.displayForm = true;
  }

  onUpdateForm(id: number, name: string) {
    this.onUpdate = true;
    this.displayForm = true;
    this.tagForm.setValue({
      id: id,
      name: name,
    });
  }
  onDelete(id: number, name: string) {
    this.deleteForm = true;
    this.tagForm.setValue({
      id: id,
      name: name,
    });
  }

  createTag() {
    this.submitted = true;
    const name = this.tagForm.get('name')?.value || '';
    if (this.tagForm.valid) {
      this.tagService.createTag(name).subscribe({
        next: (res) => {
          this.getList();
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

  updateTag() {
    this.submitted = true;
    const id = this.tagForm.get('id')?.value || 0;
    const name = this.tagForm.get('name')?.value || '';
    if (this.tagForm.valid) {
      this.tagService.updateTag(id, name).subscribe({
        next: (res) => {
          this.getList();
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

  enableTag(id: number) {
    this.tagService.enableTag(id).subscribe({
      next: (res) => {
        this.getList();
        this.showSuccess('Cập nhật thành công!!');
      },
      error: (err) => {
        this.showError(err.message);
      },
    });
  }

  deleteTag() {
    this.submitted = true;
    const id = this.tagForm.get('id')?.value || 0;
    if (this.tagForm.valid) {
      this.tagService.deleteTag(id).subscribe({
        next: (res) => {
          this.getList();
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
