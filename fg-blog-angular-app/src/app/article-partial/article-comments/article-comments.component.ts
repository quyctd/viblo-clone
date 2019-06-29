import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-article-comments',
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.css']
})
export class ArticleCommentsComponent implements OnInit {

  @Input() articleId: number;

  constructor() { }

  ngOnInit() {
  }

}
