import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommentsService } from '../article-comments/comments.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  form: FormGroup;
  @Input() commentType = 0; // 0 is create, 1 is edit, 2 is reply, 3 is answer
  @Input() articleId: number;
  @Input() inputComment: any;
  @Input() parent: any; // id of parent
  formStatus = 'INVALID';
  switcher = false; // false = Write, true = Preview
  @Output() postCommentEvent = new EventEmitter<any>();
  @Output() discardEdit = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private commentApi: CommentsService) { }

  ngOnInit() {
    let contentValue = "";
    if (this.commentType == 1 && this.inputComment) {
      contentValue = this.inputComment.content;
    }
    this.form = this.formBuilder.group({
      content : new FormControl(contentValue, [Validators.required, ])
    });

    this.form.valueChanges.subscribe(
      result => this.formStatus = this.form.status
    );
  }

  get currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  get formContent() {
    return this.form.get('content').value;
  }

  switchTabs() {
    this.switcher = !this.switcher;
  }

  doPostComment() {
    // tslint:disable:object-literal-shorthand
    const formData = {
      author: this.currentUser.id,
      content: this.form.get("content").value,
      post_parent: this.articleId,
      parent: this.parent
    };
    this.commentApi.postComment(formData).subscribe(
      data => {
        console.log(data);
        this.postCommentEvent.emit(data);
        this.form.controls['content'].setValue("");
      },
      error => {
        console.log("Post comment: ", error);
      }
    );
  }

  doDiscardEdit(commentId) {
    this.discardEdit.emit(commentId);
  }

  doEditComment(commentId) {
    const formData = {
      author: this.currentUser.id,
      content: this.form.get("content").value,
      post_parent: this.articleId,
      parent: this.parent
    };
    this.commentApi.editComment(commentId, formData).subscribe(
      data => {
        console.log("Edit post: ", data);
        this.postCommentEvent.emit(data);
        this.form.controls['content'].setValue("");
      },
      error => {
        console.log("Edit post: ", error);
      }
    );
  }

}
