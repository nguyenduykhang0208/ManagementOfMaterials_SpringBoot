// import { EventEmitter, Injectable } from '@angular/core';
// import { InputText } from 'primeng/inputtext';
// import { Observable, of, Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class OrderInfoService {
//   // orderInfo: any = {
//   //   firstname: '',
//   //   lastname: '',
//   //   country: '',
//   //   address: '',
//   //   town: '',
//   //   state: '',
//   //   postCode: '',
//   //   phone: '',
//   //   email: '',
//   //   note: '',
//   // };
//   orderInfo: any[] = [];
//   constructor() {}

//   saveOrderInfo(): void {
//     localStorage.setItem('order_info', JSON.stringify(this.orderInfo));
//   }

//   // saveChange(
//   //   firstname: string,
//   //   lastname: string,
//   //   country: string,
//   //   address: string,
//   //   town: string,
//   //   state: string,
//   //   postCode: string,
//   //   phone: string,
//   //   email: string,
//   //   note: string
//   // ) {
//   //   this.orderInfo.firstname = firstname;
//   //   this.orderInfo.lastname = lastname;
//   //   this.orderInfo.country = country;
//   //   this.orderInfo.address = address;
//   //   this.orderInfo.town = town;
//   //   this.orderInfo.state = state;
//   //   this.orderInfo.postCode = postCode;
//   //   this.orderInfo.phone = phone;
//   //   this.orderInfo.email = email;
//   //   this.orderInfo.note = note;
//   //   this.saveOrderInfo();
//   // }
//   saveChange(item: any) {
//     this.orderInfo.push(item);
//     this.saveOrderInfo();
//   }

//   getItems() {
//     return this.orderInfo;
//   }

//   clearOrderInfo() {
//     // this.orderInfo = {
//     //   firstname: '',
//     //   lastname: '',
//     //   country: '',
//     //   address: '',
//     //   town: '',
//     //   state: '',
//     //   postCode: '',
//     //   phone: '',
//     //   email: '',
//     //   note: '',
//     // };
//     this.orderInfo = [];
//     localStorage.removeItem('order_info');
//   }
// }

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class OrderInfoService {
//   orderInfoKey = 'order_info';
//   orderInfo: any = {
//     firstname: '',
//     lastname: '',
//     country: '',
//     address: '',
//     town: '',
//     state: '',
//     postCode: '',
//     phone: '',
//     email: '',
//     note: '',
//   };

//   constructor() {}

//   private saveOrderInfo(): void {
//     localStorage.setItem(this.orderInfoKey, JSON.stringify(this.orderInfo));
//   }

//   saveOrderInfoValues(values: any): void {
//     this.orderInfo = { ...this.orderInfo, ...values };

//     this.saveOrderInfo();
//   }

//   getOrderInfo(): any {
//     return this.orderInfo;
//   }

//   clearOrderInfo(): void {
//     this.orderInfo = {
//       firstname: '',
//       lastname: '',
//       country: '',
//       address: '',
//       town: '',
//       state: '',
//       postCode: '',
//       phone: '',
//       email: '',
//       note: '',
//     };
//     localStorage.removeItem(this.orderInfoKey);
//   }
// }

import { EventEmitter, Injectable } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderInfoService {
  orderInfo: any = {
    firstname: '',
    lastname: '',
    country: '',
    address: '',
    town: '',
    state: '',
    postCode: '',
    phone: '',
    email: '',
    note: '',
  };

  constructor() {}

  saveOrderInfo(): void {
    localStorage.setItem('order_info', JSON.stringify(this.orderInfo));
  }

  saveChange(
    firstname: string,
    lastname: string,
    country: string,
    address: string,
    town: string,
    state: string,
    postCode: string,
    phone: string,
    email: string,
    note: string
  ) {
    this.loadOrderInfo();
    this.orderInfo.firstname = firstname;
    this.orderInfo.lastname = lastname;
    this.orderInfo.country = country;
    this.orderInfo.address = address;
    this.orderInfo.town = town;
    this.orderInfo.state = state;
    this.orderInfo.postCode = postCode;
    this.orderInfo.phone = phone;
    this.orderInfo.email = email;
    this.orderInfo.note = note;
    this.saveOrderInfo();
  }

  // addToOrderInfo(item: any) {
  //   this.clearUserInfo();
  //   this.loadOrderInfo();
  //   this.orderInfo = { ...this.orderInfo, ...item };
  //   this.saveOrderInfo();
  // }
  loadOrderInfo(): void {
    // this.orderInfo = JSON.parse(localStorage.getItem('order_info') as any) || {
    //   firstname: '',
    //   lastname: '',
    //   country: '',
    //   address: '',
    //   town: '',
    //   state: '',
    //   postCode: '',
    //   phone: '',
    //   email: '',
    //   note: '',
    // };
    try {
      this.orderInfo = JSON.parse(localStorage.getItem('order_info') || '{}');
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }

  getItems() {
    const orderInfoString = localStorage.getItem('order_info');
    return orderInfoString ? JSON.parse(orderInfoString) : null;
  }

  clearUserInfo() {
    this.orderInfo = {
      firstname: '',
      lastname: '',
      country: '',
      address: '',
      town: '',
      state: '',
      postCode: '',
      phone: '',
      email: '',
      note: '',
    };
    localStorage.removeItem('order_info');
  }
}
