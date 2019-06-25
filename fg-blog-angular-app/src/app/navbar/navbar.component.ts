import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  userDropDown = false;
  postDropDown = false;
  userDropPos = 0;
  postDropPos = 0;


  constructor( private router: Router, private api: AuthService) { }

  ngOnInit() {
  }

  get currentToken() {
    return JSON.parse(localStorage.getItem('currentToken'));
  }

  get currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  toggleUserIcon(event) {
    this.userDropDown = !this.userDropDown;

    // tslint:disable-next-line:prefer-const
    let target = event.target || event.srcElement || event.currentTarget;
    // tslint:disable-next-line:prefer-const
    let userDropEle = document.getElementById("el-popover-2686");
    if (this.userDropDown) {
      userDropEle.style.display = 'block';
    } else {
      userDropEle.style.display = 'none';
    }
    this.userDropPos = target.getBoundingClientRect().left - userDropEle.getBoundingClientRect().width + 37;
    userDropEle.style.left = this.userDropPos + "px";

  }

  togglePostIcon(event) {
    this.postDropDown = !this.postDropDown;

    // tslint:disable-next-line:prefer-const
    let target = event.target || event.srcElement || event.currentTarget;
    // tslint:disable-next-line:prefer-const
    let postDropEle = document.getElementById("dropdown-menu-1056");
    if (this.postDropDown) {
      postDropEle.style.display = 'block';
    } else {
      postDropEle.style.display = 'none';
    }
    this.postDropPos = -postDropEle.getBoundingClientRect().width + 19;
    postDropEle.style.left = this.postDropPos + "px";

  }

  btnSignin() {
    this.router.navigateByUrl('/login');
  }

  btnLogout() {
    this.router.navigateByUrl('/login');
  }

}
