import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-feed-links',
  templateUrl: './post-feed-links.component.html',
  styleUrls: ['./post-feed-links.component.css']
})
export class PostFeedLinksComponent implements OnInit {

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
