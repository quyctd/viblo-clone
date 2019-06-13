import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NameValidator, EmailValidator, UsernameValidator, PasswordValidator, RepeatPasswordValidator } from './validator';
import { AuthService as MyAuthService } from '../auth.service';
import {Router} from '@angular/router';

import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MyAuthService]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  user: SocialUser;
  router;
  isChecked = false;
  btnDisable = true;

  // tslint:disable-next-line:variable-name
  constructor(private formBuilder: FormBuilder, private api: MyAuthService, _router: Router, private authService: AuthService) {
    this.router = _router;
  }

  ngOnInit() {
    // Init form
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

    // Init authentic
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
      if (user) {
        this.router.navigateByUrl('/newest');
      }
    });
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

  toggleTerm(event) {
    this.isChecked = !this.isChecked;
    this.btnDisable = !this.isChecked;
  }

  doBasicRegister = () => {
    const formData = {
      email : this.email.value,
      username : this.username.value,
      password: this.password.value,
      re_password : this.re_password.value
    };
    this.api.basicRegister(formData).subscribe(
      data => {
        this.api.user = data;
        console.log("Success: " + data);
        this.router.navigateByUrl('/');
      },
      error => {
        console.log("ERROR");
      }
    );
  }

  doFacebookRegister(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
        x => {
          console.log(x);
          this.router.navigateByUrl('/');
        },
        error => {
          console.log("ERROR");
        }
      );
  }

  doGoogleRegister(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      x => {
        console.log(x);
        this.router.navigateByUrl('/');
      },
      error => {
        console.log("ERROR");
      }
    );

  }

  doGithubRegister() {

  }
}
