import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseurl = 'http://127.0.0.1:8000/api/v1/authen';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  user: any = null;

  constructor(private http: HttpClient) { }

  login(formData): Observable<any> {
    const body = { username : formData.username, email: formData.email, password: formData.password};
    return this.http.post(this.baseurl + '/accounts/login/', body, {headers : this.httpHeaders});
  }

  basicRegister(formData): Observable<any> {
    const body = { username : formData.username, email: formData.email, password1: formData.password, password2: formData.re_password};
    return this.http.post(this.baseurl + '/accounts/registration/', body, {headers : this.httpHeaders});
  }

  loginFacebook(token): Observable<any> {
    const body = { access_token : token};
    return this.http.post(this.baseurl + '/login/facebook/', body, {headers: this.httpHeaders});
  }

  loginGoogle(token): Observable<any> {
    const body = { access_token : token};
    return this.http.post(this.baseurl + '/login/google/', body, {headers: this.httpHeaders});
  }

  logout(): Observable<any> {
    return this.http.post(this.baseurl + '/accounts/logout/', {}, {headers: this.httpHeaders});
  }
}
