import { Component, OnInit, Input } from '@angular/core';
import { calTimeDifference } from '../../utils/utils';

@Component({
  selector: 'app-question-feed',
  templateUrl: './question-feed.component.html',
  styleUrls: ['./question-feed.component.css']
})
export class QuestionFeedComponent implements OnInit {

  @Input() questions = [];

  constructor() { }

  ngOnInit() {
  }

  getTimePublish(publishDay) {
    return calTimeDifference(publishDay);
  }

}
