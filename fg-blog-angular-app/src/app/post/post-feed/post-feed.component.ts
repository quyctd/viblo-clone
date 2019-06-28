import { Component, OnInit, Input } from '@angular/core';
import { calTimeDifference, calReadTime } from '../../utils/utils';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {

  @Input() posts = [];
  switcherLayout = false; // false is Only title, true is with preview

  constructor() { }

  ngOnInit() {
    console.log(this.posts);
  }

  switchLayout() {
    this.switcherLayout = !this.switcherLayout;
  }

  getTimePublish(publishDay) {
    return calTimeDifference(publishDay);
  }

  getReadTime(content) {
    return calReadTime(content);
  }

}
