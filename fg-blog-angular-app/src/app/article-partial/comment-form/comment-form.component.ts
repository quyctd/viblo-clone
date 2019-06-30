import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommentsService } from '../article-comments/comments.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  form: FormGroup;
  @Input() articleId: number;
  @Input() parent: any; // id of parent
  formStatus = 'INVALID';
  switcher = false; // false = Write, true = Preview

  constructor(private formBuilder: FormBuilder, private commentApi: CommentsService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      content : new FormControl('', [Validators.required, ])
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
      },
      error => {
        console.log("Post comment: ", error);
      }
    );
  }
}
