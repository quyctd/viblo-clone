import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  form: FormGroup;
  @Input() articleId: number;
  formStatus = 'INVALID';
  switcher = false; // false = Write, true = Preview

  constructor(private formBuilder: FormBuilder) { }

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
}
