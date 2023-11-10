import { Component, OnInit } from '@angular/core';
import {
  faBars,
  faHeart,
  faPhone,
  faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { concatMap, from } from 'rxjs';
import { Order } from 'src/app/_class/order';
import { OrderDetail } from 'src/app/_class/order-detail';
import { Router } from '@angular/router';

import { CartService } from 'src/app/_service/cart.service';
import { OrderService } from 'src/app/_service/order.service';
import { ProductService } from 'src/app/_service/product.service';
import { StorageService } from 'src/app/_service/storage.service';
import { UserService } from 'src/app/_service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [MessageService],
})
export class CheckoutComponent implements OnInit {
  heart = faHeart;
  bag = faShoppingBag;
  phone = faPhone;
  bars = faBars;
  showDepartment = false;
  order = new Order();
  listOrderDetail: any[] = [];
  username!: string;
  userId: any;
  submitted = false;

  // orderForm: any = {
  //   firstname: null,
  //   lastname: null,
  //   country: null,
  //   addrest: null,
  //   town: null,
  //   state: null,
  //   postCode: null,
  //   email: null,
  //   phone: null,
  //   note: null,
  // };

  orderForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    country: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    town: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    postCode: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    note: new FormControl(''),
  });

  constructor(
    public cartService: CartService,
    private orderService: OrderService,
    private storageService: StorageService,
    private userService: UserService,
    private productService: ProductService,
    private messageService: MessageService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.username = this.storageService.getUser().username;
    this.userId = this.storageService.getUser().id;
    this.getUserInfor();
    this.cartService.getItems();
    console.log(this.cartService.getItems());
    // console.log(this.username);
  }

  getUserInfor() {
    this.userService.getUserById(this.userId).subscribe({
      next: (res) => {
        // this.orderForm.firstname = res.firstname;
        // this.orderForm.lastname = res.lastname;
        // this.orderForm.email = res.email;
        // this.orderForm.country = res.country;
        // this.orderForm.town = res.town;
        // this.orderForm.state = res.state;
        // this.orderForm.address = res.address;
        // this.orderForm.phone = res.phone;
        this.orderForm.get('firstname')?.setValue(res.firstname);
        this.orderForm.get('lastname')?.setValue(res.lastname);
        this.orderForm.get('email')?.setValue(res.email);
        this.orderForm.get('country')?.setValue(res.country);
        this.orderForm.get('address')?.setValue(res.address);
        this.orderForm.get('town')?.setValue(res.town);
        this.orderForm.get('state')?.setValue(res.state);
        this.orderForm.get('postCode')?.setValue(res.postCode);
        this.orderForm.get('phone')?.setValue(res.phone);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showDepartmentClick() {
    this.showDepartment = !this.showDepartment;
  }

  placeOrder() {
    this.submitted = true;
    this.cartService.items.forEach((res) => {
      let orderDetail: OrderDetail = new OrderDetail();
      orderDetail.productId = res.id;
      orderDetail.name = res.name;
      orderDetail.price = res.price;
      orderDetail.quantity = res.quantity;
      orderDetail.subTotal = res.subTotal;
      this.listOrderDetail.push(orderDetail);
    });
    from(this.listOrderDetail)
      .pipe(
        concatMap((item: any) => {
          return this.productService.updateQuantityProduct(
            item.productId,
            -item.quantity
          );
        })
      )
      .subscribe({
        next: (res) => {},
        error: (err) => {},
      });
    // const {
    //   firstname,
    //   lastname,
    //   country,
    //   address,
    //   town,
    //   state,
    //   postCcode,
    //   phone,
    //   email,
    //   note,
    // } = this.orderForm;
    const firstname = this.orderForm.get('firstname')?.value || '';
    const lastname = this.orderForm.get('lastname')?.value || '';
    const country = this.orderForm.get('country')?.value || '';
    const address = this.orderForm.get('address')?.value || '';
    const town = this.orderForm.get('town')?.value || '';
    const state = this.orderForm.get('state')?.value || '';
    const postCcode = this.orderForm.get('postCcode')?.value || '';
    const phone = this.orderForm.get('phone')?.value || '';
    const email = this.orderForm.get('email')?.value || '';
    const note = this.orderForm.get('note')?.value || '';
    if (this.orderForm.valid) {
      this.orderService
        .placeOrder(
          firstname,
          lastname,
          country,
          address,
          town,
          state,
          postCcode,
          phone,
          email,
          note,
          this.listOrderDetail,
          this.username
        )
        .subscribe({
          next: (res) => {
            this.cartService.clearCart();
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.log(err);
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
}
