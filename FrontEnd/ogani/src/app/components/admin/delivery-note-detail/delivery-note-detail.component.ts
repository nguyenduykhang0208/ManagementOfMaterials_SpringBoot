import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/_service/order.service';

@Component({
  selector: 'app-delivery-note-detail',
  templateUrl: './delivery-note-detail.component.html',
  styleUrls: ['./delivery-note-detail.component.css'],
})
export class DeliveryNoteDetailComponent implements OnInit {
  deliveryNoteId: number = 0;
  listDetail: any;
  deliveryNoteDetail: any;
  orderIfo: any;
  orderForm: any = {
    firstname: null,
    lastname: null,
    totalPrice: null,
    phone: null,
    date: null,
    email: null,
    enable: null,
  };
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getDeliveryNoteId();
    this.getOrderInfo();
    this.getListOrder();
  }
  getDeliveryNoteId() {
    this.route.params.subscribe((params) => {
      this.deliveryNoteId = params['id'];
    });
  }
  getOrderInfo() {
    this.orderService.getOrderById(this.deliveryNoteId).subscribe({
      next: (res) => {
        this.orderForm.firstname = res.firstname;
        this.orderForm.lastname = res.lastname;
        this.orderForm.totalPrice = res.totalPrice;
        this.orderForm.date = res.date;
        this.orderForm.phone = res.phone;
        this.orderForm.email = res.email;
        this.orderForm.enable = res.enable;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getListOrder() {
    this.orderService.getListOrderDetail(this.deliveryNoteId).subscribe({
      next: (res) => {
        this.listDetail = res;
        console.log(this.listDetail);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  goBack() {
    if (this.deliveryNoteId) this.router.navigateByUrl('/admin/delivery-note');
    else this.router.navigateByUrl('/admin');
  }
}
