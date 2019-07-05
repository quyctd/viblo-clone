import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl += 'question/';
  }

  updateHttpHeaders() {
    const token = "Token " + JSON.parse(localStorage.getItem('currentToken')).token;
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', Authorization: token});
  }

  getNewestQuestion(currentPage): Observable<any> {
    return this.http.get(this.baseUrl + "newest/?page=" + currentPage, {headers: this.httpHeaders});
  }

  getQuestionData(questionId): Observable<any> {
    return this.http.get(this.baseUrl + questionId + "/", { headers: this.httpHeaders});
  }

  updateQuestion(questionId, formData): Observable<any> {
    this.updateHttpHeaders();
    return this.http.put(this.baseUrl + questionId + "/", formData, {headers: this.httpHeaders});
  }

  deleteQuestionClip(clipId): Observable<any> {
    this.updateHttpHeaders();
    return this.http.delete(this.baseUrl + "clips/" + clipId + "/", {headers: this.httpHeaders});
  }

  createQuestionClip(questionId, userId): Observable<any> {
    this.updateHttpHeaders();
    const body = {question: questionId, user: userId};
    return this.http.post(this.baseUrl + "clips/", body, {headers : this.httpHeaders});
  }

  findQuestionClipData(questionId, userId): Observable<any> {
    return this.http.get(this.baseUrl + "clips/find/" + questionId + "/" + userId + "/", {headers : this.httpHeaders});
  }
}
