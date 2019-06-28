import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewestPostsService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl += "post/";
  }

  getNewestPost(currentPage): Observable<any> {
    return this.http.get(this.baseUrl + "newest/?page=" + currentPage, {headers: this.httpHeaders});
  }
}
