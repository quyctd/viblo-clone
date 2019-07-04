import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { PublishPostService } from '../publish-post.service';
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
  isSaved = false;
  savedTime = "";
  customize: any;

  constructor(public formBuilder: FormBuilder, public postApi: PublishPostService, _router: Router) {
    this.router = _router;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      simplemde : new FormControl(""),
      title : new FormControl(""),
      tags : new FormControl("")
    });
  }

  get currentToken() {
    return JSON.parse(localStorage.getItem('currentToken'));
  }

  get currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

}
