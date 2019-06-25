import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  baseUrl: string;
  httpHeaders: HttpHeaders;

  constructor(protected http: HttpClient) {
    this.baseUrl = environment.baseUrl;
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  }
}
