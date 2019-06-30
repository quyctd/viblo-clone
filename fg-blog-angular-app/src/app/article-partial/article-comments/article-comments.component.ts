import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from './comments.service';
import { calTimeDifference } from '../../utils/utils';

@Component({
  selector: 'app-article-comments',
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.css']
})
export class ArticleCommentsComponent implements OnInit {

  @Input() articleId: number;
  data = [];

  constructor(private api: CommentsService) { }

  ngOnInit() {
    console.log("Post id: ", this.articleId);
    this.getListComment();
  }

  getListComment() {
    this.api.getCommentOfPost(this.articleId).subscribe(
      data => {
        this.data = data;
        console.log(data);
      },
      error => {
        console.log("get comment: ", error);
      }
    );
  }

  getTimePublish(publishTime) {
    return calTimeDifference(publishTime);
  }

}
