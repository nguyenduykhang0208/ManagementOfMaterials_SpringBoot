import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/_service/auth.service';
import { StorageService } from 'src/app/_service/storage.service';
import { UserService } from 'src/app/_service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class AccountComponent implements OnInit {
  listUser: any;
  showDelete: boolean = false;
  showForm: boolean = false;
  submitted = false;
  userId: any;
  userRole: any;

  userForm = new FormGroup({
    id: new FormControl(0),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(5),
      Validators.maxLength(30),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
    ]),
  });

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private storageService: StorageService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.getListUser();
    this.getUserId();
    this.getUserRole();
  }

  getUserId() {
    this.userId = this.storageService.getUser().id;
  }

  getUserRole() {
    this.userRole = this.storageService.getUser().roles[0];
  }

  getListUser() {
    this.userService.getListUser().subscribe({
      next: (res) => {
        this.listUser = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  enableUser(id: number) {
    this.userService.enableUser(id).subscribe({
      next: (res) => {
        this.getListUser();
        this.showSuccess('Cập nhật thành công!!');
      },
      error: (err) => {
        this.showError(err.message);
      },
    });
  }

  openNew() {
    this.showForm = true;
    this.submitted = false;
    this.userForm.patchValue({
      username: null,
      email: null,
      password: null,
    });
  }

  createAccount() {
    this.submitted = true;
    const username = this.userForm.get('username')?.value || '';
    const email = this.userForm.get('email')?.value || '';
    const password = this.userForm.get('password')?.value || '';
    if (this.userForm.valid) {
      this.authService.register(username, email, password).subscribe({
        next: (res) => {
          this.getListUser();
          this.showSuccess('Đăng ký thành công');
          this.getListUser();
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

  onDelete(id: number, username: string) {
    this.showDelete = true;
    this.userForm.patchValue({
      id: id,
      username: username,
    });
  }

  showSuccess(text: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: text,
    });
  }

  deleteUser() {
    const id = this.userForm.get('id')?.value || 0;
    this.userService.deleteUser(id).subscribe({
      next: (res) => {
        this.getListUser();
        this.showWarn('Xóa thành công');
        this.showDelete = false;
      },
      error: (err) => {
        this.showError(err.message);
      },
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
