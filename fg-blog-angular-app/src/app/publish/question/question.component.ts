import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AskQuestionService } from '../ask-question.service';
import {Router} from '@angular/router';
import { auditTime } from 'rxjs/operators';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  form: FormGroup;
  router;
  publishDropdown = false;
  isClickFeatureImage = false;
  isCanPublish = false;
  customize: any;
  isHasFirstSubmit = false;

  // tslint:disable-next-line:variable-name
  constructor(public formBuilder: FormBuilder, public questionApi: AskQuestionService, _router: Router) {
    this.router = _router;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      simplemde : new FormControl("", [Validators.required, ]),
      title : new FormControl("", [Validators.required, ]),
      tags : new FormControl("", [Validators.required, ])
    });

    // Init authentic
    if (localStorage.getItem('currentToken') == null) {
      this.router.navigateByUrl('/login');
    }
  }

  checkValidForm() {
    // tslint:disable:no-string-literal
    const title = this.title.value;
    const tags = this.questionApi.listTag.length;
    const content = this.simplemde.value;
    if (title && tags && content) {
      return true;
    } else {
      if (!title) {
        this.form.controls['title'].markAsTouched();
        this.form.controls['title'].setErrors({ required : true});
      }
      if (!tags) {
        this.form.controls['tags'].markAsTouched();
      }
      if (!content) {
        this.form.controls['simplemde'].markAsTouched();
      }
      return false;
    }
  }

  get currentToken() {
    return JSON.parse(localStorage.getItem('currentToken'));
  }

  get currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  get simplemde() {
    return this.form.get('simplemde');
  }

  get title() {
    return this.form.get('title');
  }

  get tags() {
    return this.form.get('tags');
  }

  addTag(event) {
    const target = event.currentTarget;
    if (this.questionApi.listTag.length < 5) {
      const value = target.value.trim();
      if (!this.questionApi.listTag.includes(value) && value !== "") {
        this.questionApi.listTag.push(target.value);
      }
    }
    target.value = "";
  }

  doCreateQuestion() {
    this.isHasFirstSubmit = true;
    if (!this.checkValidForm()) {
      return;
    }
    const formData = {
      author: this.currentUser.id,
      tags: this.questionApi.listTag,
      title: this.title.value,
      content: this.simplemde.value
    };
    this.questionApi.createQuestion(formData).subscribe(
      data => {
        console.log("Create question success: ", data);
        this.router.navigateByUrl('/questions');
      },
      error => {
        console.log("Create question error: ", error);
      }
    );
  }

  doDiscardCreateQuestion() {
    this.router.navigateByUrl('/questions');
  }
}
