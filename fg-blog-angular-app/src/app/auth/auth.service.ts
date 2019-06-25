import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string;
  baseUrl = environment.baseUrl;
  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.url = this.baseUrl + "authen";
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
   }

  login(formData): Observable<any> {
    const body = { username : formData.username, email: formData.email, password: formData.password};
    return this.http.post(this.url + '/accounts/login/', body, {headers : this.httpHeaders});
  }

  basicRegister(formData): Observable<any> {
    // tslint:disable-next-line:max-line-length
    const body = { name: formData.name, username : formData.username, email: formData.email, password1: formData.password, password2: formData.re_password};
    return this.http.post(this.url + '/accounts/register/', body, {headers : this.httpHeaders});
  }

  loginFacebook(token): Observable<any> {
    const body = { access_token : token};
    return this.http.post(this.url + '/login/facebook/', body, {headers: this.httpHeaders});
  }

  loginGoogle(token): Observable<any> {
    const body = { access_token : token};
    return this.http.post(this.url + '/login/google/', body, {headers: this.httpHeaders});
  }

  logout(): Observable<any> {
    return this.http.post(this.url + '/accounts/logout/', {}, {headers: this.httpHeaders});
  }

  getUserDataFromToken(token): Observable<any> {
    const auth = 'Token ' + token;
    const headers = new HttpHeaders({'Content-Type': 'application/json', Authorization: auth});

    // tslint:disable-next-line:object-literal-shorthand
    return this.http.get(this.url + '/token/token_to_user/', {headers: headers});
  }
}
