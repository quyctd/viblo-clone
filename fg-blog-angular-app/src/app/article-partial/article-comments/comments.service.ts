import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService extends BaseService {

  constructor(protected http: HttpClient) {
    super(http);
    this.baseUrl += "discussion/";
    const token = "Token " + JSON.parse(localStorage.getItem('currentToken')).token;
    // this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', Authorization: token});
  }

  public getCommentOfPost(postId): Observable<any> {
    return this.http.get(this.baseUrl + "comments/" + postId + "/", { headers: this.httpHeaders});
  }

  public postComment(formData): Observable<any> {
    const parentValue = formData.parent === 0 ? null : formData.parent;
    const body = {author: formData.author, content: formData.content, post_parent: formData.post_parent, parent: parentValue};
    const token = "Token " + JSON.parse(localStorage.getItem('currentToken')).token;
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', Authorization: token});
    return this.http.post(this.baseUrl + "comments/", body, {headers: this.httpHeaders});
  }
 }
