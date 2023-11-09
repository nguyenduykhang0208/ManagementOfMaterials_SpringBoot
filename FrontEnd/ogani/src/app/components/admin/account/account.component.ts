import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/_service/auth.service';
import { StorageService } from 'src/app/_service/storage.service';
import { UserService } from 'src/app/_service/user.service';

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
  userId: any;
  userRole: any;
  userForm: any = {
    id: null,
    username: null,
    email: null,
    password: null,
  };

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
    this.userForm = {
      id: null,
      username: null,
      email: null,
      password: null,
    };
  }

  createAccount() {
    console.log(this.userForm);
    this.authService
      .register(
        this.userForm.username,
        this.userForm.email,
        this.userForm.password
      )
      .subscribe({
        next: (res) => {
          this.getListUser();
          this.showSuccess('Đăng ký thành công');
          this.getListUser();
          this.showForm = false;
        },
        error: (err) => {
          this.showError(err.message);
        },
      });
  }

  onDelete(id: number, username: string) {
    this.showDelete = true;
    this.userForm.id = id;
    this.userForm.username = username;
  }

  showSuccess(text: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: text,
    });
  }

  deleteUser() {
    this.userService.deleteUser(this.userForm.id).subscribe({
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
