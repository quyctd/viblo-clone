import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { LoginService } from '../login.service';
import {Router} from '@angular/router';

import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]

})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user: SocialUser;
  router;

  // tslint:disable-next-line:variable-name
  constructor(private formBuilder: FormBuilder, private api: LoginService, _router: Router, private authService: AuthService) {
    this.router = _router;
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
        username : new FormControl('', [Validators.required, ]),
        password : new FormControl('', [ Validators.required, Validators.minLength(6)]),
      }
    );
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  doLogin(): void {
    const formUser = this.username.value;
    
    const formData = {
      username : this.ValidateEmail(formUser) ? "" : formUser,
      email : this.ValidateEmail(formUser) ? formUser : "",
      password : this.password.value
    };
    this.api.login(formData).subscribe(
      data => {
        console.log("Logged in");
        console.log(data);
        this.router.navigateByUrl('/');
      },
      error => {
        console.log("Login error");
      }
    );
  }

  ValidateEmail(data) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data)) {
        return (true);
      }
    return (false);
  }

}
