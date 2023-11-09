import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

const USER_API = 'http://localhost:8080/api/users/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  getUser(username: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.http.get(USER_API, { params: params });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(USER_API + '' + id, httpOptions);
  }

  updateProfile(
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    country: string,
    town: String,
    state: string,
    address: string,
    phone: string
  ): Observable<any> {
    return this.http.put(
      USER_API + 'update',
      {
        username,
        firstname,
        lastname,
        email,
        country,
        town,
        state,
        address,
        phone,
      },
      httpOptions
    );
  }

  changePassword(
    username: string,
    oldPassword: string,
    newPassword: string
  ): Observable<any> {
    return this.http.put(
      USER_API + 'password',
      { username, oldPassword, newPassword },
      httpOptions
    );
  }

  getListUser(): Observable<any> {
    return this.http.get(USER_API + 'all', httpOptions);
  }

  enableUser(id: number) {
    return this.http.put(USER_API + 'enable/' + id, httpOptions);
  }

  deleteUser(id: number) {
    return this.http.delete(USER_API + 'delete/' + id, httpOptions);
  }

  updateRole(id: number, role: String[]) {
    return this.http.put(USER_API + 'role/' + id, { role }, httpOptions);
  }
}
