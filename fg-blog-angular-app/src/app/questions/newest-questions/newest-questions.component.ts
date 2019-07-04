import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

}
