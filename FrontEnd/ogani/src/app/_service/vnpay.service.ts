// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AppConfig } from 'src/app/config/AppConfig';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const VNPAY_API = 'http://localhost:8080/api/payment/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class VNPayService {
  constructor(private http: HttpClient) {}
  //lấy full đường dẫn
  // private getFullUrl(endpoint: string): string {
  //   return `${AppConfig.baseUrl}/${endpoint}`;
  // }

  // getPayment(price: number, id: number): Observable<string> {
  //   let params = new HttpParams()
  //     .set('price', price.toString())
  //     .set('contractId', id.toString());
  //   return this.http.get(this.getFullUrl('api/v1/pay'), {
  //     params,
  //     responseType: 'text', // Yêu cầu response dưới dạng văn bản
  //   });
  // }
  // getPaymentService(price: number, id: number): Observable<string> {
  //   let params = new HttpParams()
  //     .set('price', price.toString())
  //     .set('registerServiceId', id.toString());
  //   return this.http.get(this.getFullUrl('api/v1/pay-service'), {
  //     params,
  //     responseType: 'text', // Yêu cầu response dưới dạng văn bản
  //   });
  // }

  createPayment(total: number): Observable<String> {
    let params = new HttpParams();
    params = params.append('total', total);
    return this.http.get(VNPAY_API + 'create_payment', {
      params: params,
      responseType: 'text',
    });
  }
}
