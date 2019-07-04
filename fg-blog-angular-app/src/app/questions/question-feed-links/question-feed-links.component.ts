import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-question-feed-links',
  templateUrl: './question-feed-links.component.html',
  styleUrls: ['./question-feed-links.component.css']
})
export class QuestionFeedLinksComponent implements OnInit {
  @Input() currRoute: any;

  constructor() { }

  ngOnInit() {
  }

  get currentToken() {
    return JSON.parse(localStorage.getItem('currentToken'));
  }

  get currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }


}
