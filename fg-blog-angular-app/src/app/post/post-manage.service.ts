import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostManageService {

  listTag = [];
  baseurl = 'http://127.0.0.1:8000/api/v1/';
  postUrl = 'http://127.0.0.1:8000/api/v1/post/';
  token = "Token " + JSON.parse(localStorage.getItem('currentToken')).token;
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json', Authorization: this.token});

  constructor(private http: HttpClient) { }

  getPostData(id): Observable<any> {
    return this.http.get(this.postUrl + id + '/', {headers : this.httpHeaders});
  }

  updatePost(id, formData): Observable<any> {
    const body = formData;
    return this.http.put(this.postUrl + id + "/", body, {headers : this.httpHeaders});
  }

  getAuthorData(id): Observable<any> {
    return this.http.get(this.baseurl + 'authen/users/3', {headers : this.httpHeaders});
  }
}
