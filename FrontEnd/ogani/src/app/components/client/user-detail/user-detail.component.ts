import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/_service/auth.service';
import { StorageService } from 'src/app/_service/storage.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [MessageService],
})
export class UserDetailComponent implements OnInit {
  username: any;
  userId: any;
  user: any;

  changePassword: boolean = false;

  submitted = false;

  updateForm: any = {
    firstname: null,
    lastname: null,
    email: null,
    country: null,
    town: null,
    state: null,
    address: null,
    phone: null,
  };

  // changePasswordForm: any = {
  //   oldPassword: null,
  //   newPassword: null,
  // };

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
    ]),
    newPasswordConfim: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
    ]),
  });

  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.storageService.getUser().username;
    this.userId = this.storageService.getUser().id;
    // console.log(this.storageService.getUser())
    this.getUser();
  }

  getUser() {
    this.userService.getUserById(this.userId).subscribe({
      next: (res) => {
        this.user = res;
        this.updateForm.firstname = res.firstname;
        this.updateForm.lastname = res.lastname;
        this.updateForm.email = res.email;
        this.updateForm.country = res.country;
        this.updateForm.town = res.town;
        this.updateForm.state = res.state;
        this.updateForm.address = res.address;
        this.updateForm.phone = res.phone;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateProfile() {
    const { firstname, lastname, email, country, town, state, address, phone } =
      this.updateForm;
    this.userService
      .updateProfile(
        this.username,
        firstname,
        lastname,
        email,
        country,
        town,
        state,
        address,
        phone
      )
      .subscribe({
        next: (res) => {
          this.getUser();
          this.showSuccess('Cập nhật hồ sơ thành công!');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  changePasswordFunc() {
    // const { oldPassword, newPassword } = this.changePasswordForm;
    this.submitted = true;
    const oldPassword = this.changePasswordForm.get('oldPassword')?.value || '';
    const newPassword = this.changePasswordForm.get('newPassword')?.value || '';
    const newPasswordConfim =
      this.changePasswordForm.get('newPasswordConfim')?.value || '';
    if (this.changePasswordForm.valid && newPassword === newPasswordConfim) {
      this.userService
        .changePassword(this.username, oldPassword, newPassword)
        .subscribe({
          next: (res) => {
            this.getUser();
            this.showWarn(
              'Thay đổi mật khẩu thành công! Vui lòng đăng nhập lại'
            );
            this.authService.logout().subscribe({
              next: (res) => {
                this.storageService.clean();
                this.router.navigate(['/']);
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
  }

  showChangePassword() {
    this.changePassword = true;
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
