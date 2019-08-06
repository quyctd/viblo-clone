import { Component, OnInit } from '@angular/core';
import { QuestionComponent } from 'src/app/publish/question/question.component';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  form: FormGroup;
  customize: any;
  isHasFirstSubmit = false;

  sub: any;
  id: number;
  questionData: any;

  constructor(public formBuilder: FormBuilder, public questionApi: QuestionService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    // Init authentic
    if (localStorage.getItem('currentToken') == null) {
      this.router.navigateByUrl('/login');
    }

    this.form = this.formBuilder.group({
      simplemde : new FormControl("", [Validators.required, ]),
      title : new FormControl("", [Validators.required, ]),
      tags : new FormControl("", [Validators.required, ])
    });

    this.sub = this.route.params.subscribe( params => {
      // tslint:disable-next-line:no-string-literal
      this.id = +params['id'];
    });
    this.getQuestionDataWithId(this.id);
  }

  getQuestionDataWithId(quesId) {
    this.questionApi.getQuestionData(quesId).subscribe(
      data => {
        console.log(data);
        this.questionData = data;
        this.updateDisplayInfo(data);
      },
      error => {
        console.log("ERROR: ", error);
        this.router.navigateByUrl('question/ask');
      }
    );
  }

  updateDisplayInfo(data) {
    this.form.controls.title.setValue(data.title);
    this.questionApi.listTag = data.tags;
    this.form.controls.simplemde.setValue(data.content);
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

  doDiscardEditQuestion() {
    this.router.navigateByUrl('/q/' + this.questionData.id);
  }

  doEditQuestion() {
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
    this.questionApi.updateQuestion(this.id, formData).subscribe(
      data => {
        console.log("Edit question success: ", data);
        this.router.navigateByUrl('/q/' + data.id);
      },
      error => {
        console.log("Edit question error: ", error);
      }
    );
  }
}
