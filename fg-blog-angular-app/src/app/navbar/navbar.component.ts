import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private api: AuthService) { }

  ngOnInit() {
  }

  get user() {
    return this.api.user;
  }


  btnSignin() {
    this.router.navigateByUrl('/login');
  }

  btnLogout() {
    this.router.navigateByUrl('/login');
  }

}
