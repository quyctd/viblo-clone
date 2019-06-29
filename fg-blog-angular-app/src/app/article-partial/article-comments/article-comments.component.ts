import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private api: CommentsService) { }

  ngOnInit() {
    console.log("Post id: ", this.articleId);
    this.form = this.formBuilder.group({
      content : new FormControl('', [Validators.required, ])
    });
    this.getListComment();
  }

  getListComment() {
    this.api.getCommentOfPost("1").subscribe(
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
