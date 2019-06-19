import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthService as MyAuthService } from '../auth.service';
import {Router} from '@angular/router';

import { AuthService } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  form: FormGroup;
  router;

  // tslint:disable-next-line:variable-name
  constructor(private formBuilder: FormBuilder, private api: MyAuthService, _router: Router, private authService: AuthService) {
    this.router = _router;
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
        username : new FormControl('', [Validators.required, ]),
        password : new FormControl('', [ Validators.required, Validators.minLength(6)]),
      }
    );

    // Init authentic
    if (localStorage.getItem('currentToken') != null) {
      this.router.navigateByUrl('/newest');
    }
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
        localStorage.setItem('currentToken', JSON.stringify({ token: data.key}));
        this.getUserData(data.key);
        this.router.navigateByUrl('/newest');
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

  doFacebookRegister(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
        x => {
          const authToken = x.authToken;
          this.api.loginFacebook(authToken).subscribe(
            data => {
              console.log(data);
              localStorage.setItem('currentToken', JSON.stringify({ token: data.key}));
              this.getUserData(data.key);
              this.router.navigateByUrl('/newest');
            },
            error => {
              console.log("Login error");
            }
          );
        },
        error => {
          console.log("ERROR");
        }
      );
  }

  doGoogleRegister() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      x => {
        const authToken = x.authToken;
        this.api.loginGoogle(authToken).subscribe(
          data => {
            console.log(data);
            this.getUserData(data.key);
            localStorage.setItem('currentToken', JSON.stringify({ token: data.key}));
            this.router.navigateByUrl('/newest');
          },
          error => {
            console.log("Login error");
          }
        );
      },
      error => {
        console.log("ERROR");
      }
    );

  }

  doGithubRegister() {

  }

  getUserData(token) {
    this.api.getUserDataFromToken(token).subscribe(
      data => {
        console.log(data);
        localStorage.setItem('currentUser', JSON.stringify({ id: data.id}));
      },
      error => {
        console.log("Error");
      }
    );
  }

}
