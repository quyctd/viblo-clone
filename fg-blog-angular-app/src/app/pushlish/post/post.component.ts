import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      simplemde : new FormControl(''),
    }
  );
  }

  logging() {
    console.log("Something loged when user typed");
    console.log(this.form.get('simplemde'));

  }

  get simplemde() {
    console.log(this.form.get('simplemde'));
    return this.form.get('simplemde');
  }
}
