import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NameValidator, EmailValidator, UsernameValidator, PasswordValidator, RepeatPasswordValidator } from './validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name : new FormControl('', NameValidator),
      email : new FormControl('', EmailValidator),
      username : new FormControl('', UsernameValidator),
      password : new FormControl('', PasswordValidator),
      re_password : new FormControl('', [
        Validators.required,
      ]),
    },  {validator: RepeatPasswordValidator }
    );
  }

  ngOnInit() {
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get re_password() {
    return this.form.get('re_password');
  }
}
