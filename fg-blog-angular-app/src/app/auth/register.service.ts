import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseurl = 'http://127.0.0.1:8000/api/v1/authen/accounts';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  basicRegister(formData): Observable<any> {
    const body = { username : formData.username, email: formData.email, password1: formData.password, password2: formData.re_password};
    return this.http.post(this.baseurl + '/registration/', body, {headers : this.httpHeaders});
  }
}
