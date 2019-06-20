import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseurl = 'http://127.0.0.1:8000/api/v1/authen';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  user: Observable<any> = null;

  constructor(private http: HttpClient) { }

  login(formData): Observable<any> {
    const body = { username : formData.username, email: formData.email, password: formData.password};
    this.user = this.http.post(this.baseurl + '/accounts/login/', body, {headers : this.httpHeaders});
    return this.user;
  }

  basicRegister(formData): Observable<any> {
    // tslint:disable-next-line:max-line-length
    const body = { name: formData.name, username : formData.username, email: formData.email, password1: formData.password, password2: formData.re_password};
    this.user = this.http.post(this.baseurl + '/accounts/registration/', body, {headers : this.httpHeaders});
    return this.user;
  }

  loginFacebook(token): Observable<any> {
    const body = { access_token : token};
    this.user = this.http.post(this.baseurl + '/login/facebook/', body, {headers: this.httpHeaders});
    return this.user;
  }

  loginGoogle(token): Observable<any> {
    const body = { access_token : token};
    this.user = this.http.post(this.baseurl + '/login/google/', body, {headers: this.httpHeaders});
    return this.user;
  }

  logout(): Observable<any> {
    this.user = null;
    return this.http.post(this.baseurl + '/accounts/logout/', {}, {headers: this.httpHeaders});
  }

  getUserDataFromToken(token): Observable<any> {
    const auth = 'Token ' + token;
    const headers = new HttpHeaders({'Content-Type': 'application/json', Authorization: auth});

    // tslint:disable-next-line:object-literal-shorthand
    return this.http.get(this.baseurl + '/token/token_to_user/', {headers: headers});
  }
}
