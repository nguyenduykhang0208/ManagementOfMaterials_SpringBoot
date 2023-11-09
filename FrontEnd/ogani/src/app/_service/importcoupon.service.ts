import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImportCouponDetail } from '../_class/importcoupon_detail';

const IMPORTCOUPON_API = 'http://localhost:8080/api/importcoupon/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ImportCouponService {
  constructor(private http: HttpClient) {}

  getListImportCoupon(): Observable<any> {
    return this.http.get(IMPORTCOUPON_API, httpOptions);
  }

  createImportCoupon(
    userId: number,
    supplierId: number,
    importCouponDetail: ImportCouponDetail[]
  ): Observable<any> {
    return this.http.post(
      IMPORTCOUPON_API + 'create',
      { userId, supplierId, importCouponDetail },
      httpOptions
    );
  }

  enableImportCoupon(id: number) {
    return this.http.put(IMPORTCOUPON_API + 'enable/' + id, httpOptions);
  }

  getListImportCouponDetail(id: number): Observable<any> {
    return this.http.get(IMPORTCOUPON_API + id, httpOptions);
  }

  deleteImportCoupon(id: number) {
    return this.http.delete(IMPORTCOUPON_API + 'delete/' + id, httpOptions);
  }
}
