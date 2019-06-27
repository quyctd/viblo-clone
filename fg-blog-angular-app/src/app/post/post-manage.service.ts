import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostManageService {

  listTag = [];
  baseUrl = environment.baseUrl + 'post/';
  token = "Token " + JSON.parse(localStorage.getItem('currentToken')).token;
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json', Authorization: this.token});

  constructor(private http: HttpClient) { }

  getPostData(id): Observable<any> {
    return this.http.get(this.baseUrl + id + '/', {headers : this.httpHeaders});
  }

  updatePost(id, formData): Observable<any> {
    const body = formData;
    return this.http.put(this.baseUrl + id + "/", body, {headers : this.httpHeaders});
  }

  findPostClipData(postId, userId): Observable<any> {
    return this.http.get(this.baseUrl + "clips/find/" + postId + "/" + userId + "/", {headers : this.httpHeaders});
  }

  createPostClip(postId, userId): Observable<any> {
    const body = {post: postId, user: userId};
    return this.http.post(this.baseUrl + "clips/", body, {headers : this.httpHeaders});
  }

  deletePostClip(clipId): Observable<any> {
    return this.http.delete(this.baseUrl + "clips/" + clipId + "/", {headers: this.httpHeaders});
  }

}
