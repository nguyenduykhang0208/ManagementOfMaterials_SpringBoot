import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_service/user.service';
import { StorageService } from 'src/app/_service/storage.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class AccountInfoComponent implements OnInit {
  changeRole: boolean = false;
  roleChoose: any;
  userId: any;
  userRole: any;
  roles: any[] = [];

  userForm: any = {
    id: null,
    firstname: null,
    lastname: null,
    email: null,
    country: null,
    town: null,
    state: null,
    address: null,
    phone: null,
    role: null,
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private messageService: MessageService,
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
    this.getUserFromId();
    this.getUserFromInfo();
    this.getUser();
  }

  getUser() {
    this.userId = this.storageService.getUser().id;
    this.userRole = this.storageService.getUser().roles[0];
  }

  getUserFromId() {
    this.route.params.subscribe((params) => {
      this.userForm.id = params['id'];
    });
  }

  getUserFromInfo() {
    this.userService.getUserById(this.userForm.id).subscribe({
      next: (res) => {
        this.userForm.id = res.id;
        this.userForm.firstname = res.firstname;
        this.userForm.lastname = res.lastname;
        this.userForm.email = res.email;
        this.userForm.country = res.country;
        this.userForm.town = res.town;
        this.userForm.state = res.state;
        this.userForm.address = res.address;
        this.userForm.phone = res.phone;
        this.userForm.role = res.roles[0].name;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showChangeRole() {
    this.changeRole = true;
  }

  changeRoleFunc() {
    this.roles.push(this.roleChoose);
    console.log(this.roles);
    this.userService.updateRole(this.userForm.id, this.roles).subscribe({
      next: (res) => {
        this.getUserFromInfo();
        this.changeRole = false;
      },
      error: (err) => {
        this.showError(err.message);
      },
    });
  }

  goBack() {
    this.router.navigateByUrl('/admin/account');
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
}
