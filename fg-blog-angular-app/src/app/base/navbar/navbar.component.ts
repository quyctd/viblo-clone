import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userDropDown = false;
  postDropDown = false;
  navbarRoute = 0; // 0 is post, 1 is question, 2 is discussion


  constructor( private router: Router, private api: AuthService) { }

  ngOnInit() {
    const currRoute = this.router.url;
    if (currRoute.includes('questions')) {
      this.navbarRoute = 1;
    } else if (currRoute.includes('discussion')) {
      this.navbarRoute = 2;
    }
  }

  get currentToken() {
    return JSON.parse(localStorage.getItem('currentToken'));
  }

  get currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  btnSignin() {
    this.router.navigateByUrl('/login');
  }

  btnLogout() {
    this.router.navigateByUrl('/login');
  }

}
