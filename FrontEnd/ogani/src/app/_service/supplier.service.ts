import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const SUPPLIER_API = 'http://localhost:8080/api/supplier/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  getListSupplier(): Observable<any> {
    return this.http.get(SUPPLIER_API, httpOptions);
  }

  createSupplier(name: string, phone: string, address: string, email: string) {
    return this.http.post(
      SUPPLIER_API + 'create',
      { name, phone, address, email },
      httpOptions
    );
  }

  updateSupplier(
    id: number,
    name: string,
    phone: string,
    address: string,
    email: string
  ) {
    return this.http.put(
      SUPPLIER_API + 'update/' + id,
      { name, phone, address, email },
      httpOptions
    );
  }

  deleteSupplier(id: number) {
    return this.http.delete(SUPPLIER_API + 'delete/' + id, httpOptions);
  }
}
