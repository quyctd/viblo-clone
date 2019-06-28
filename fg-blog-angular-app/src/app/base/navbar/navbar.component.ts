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


  constructor( private router: Router, private api: AuthService) { }

  ngOnInit() {
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
