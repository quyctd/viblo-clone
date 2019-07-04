import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-newest-questions',
  templateUrl: './newest-questions.component.html',
  styleUrls: ['./newest-questions.component.css']
})
export class NewestQuestionsComponent implements OnInit {

  newestQuestion = [];
  currPage = 1;
  numPages: number;
  pageSize: number;
  nextPage: number;
  previousPage: number;

  constructor(private questionApi: QuestionService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      // tslint:disable-next-line:no-string-literal
      let currPage = params['page'];
      if (currPage === undefined) {
        currPage = 1;
      }
      this.currPage = parseInt(currPage, 10);
      // tslint:disable-next-line:triple-equals
      if (this.router.url == "/") {
        this.router.navigateByUrl('/newest');
      }
      this.getNewestQuestion();
    });
  }

  getNewestQuestion() {
    this.questionApi.getNewestQuestion(this.currPage).subscribe(
      data => {
        this.newestQuestion = data.results;
        this.pageSize = data.page_size;
        this.numPages = data.num_pages;
        this.nextPage = this.currPage === this.numPages ? 0 : this.currPage + 1;
        this.previousPage = this.currPage === 1 ? 0 : this.currPage - 1;
      },
      error => {
        console.log("Get newest question error: ", error);
      }
    );
  }

}
