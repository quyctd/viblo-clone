import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublishPostService {

  listTag = [];
  baseurl = environment.baseUrl + 'post/';

  constructor(private http: HttpClient) { }

  createPost(formData): Observable<any> {
    const body = {tags: formData.tags, title: formData.title, content: formData.content, author: formData.author};
    const token = "Token " + JSON.parse(localStorage.getItem('currentToken')).token;
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/json', Authorization: token});

    return this.http.post(this.baseurl, body, {headers: httpHeaders});
  }
}
