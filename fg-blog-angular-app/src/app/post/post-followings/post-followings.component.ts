import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-followings',
  templateUrl: './post-followings.component.html',
  styleUrls: ['./post-followings.component.css']
})
export class PostFollowingsComponent implements OnInit {

  followPost = [];
  currPage = 1;
  numPages: number;
  pageSize: number;
  nextPage: number;
  previousPage: number;

  constructor() { }

  ngOnInit() {
  }

}
