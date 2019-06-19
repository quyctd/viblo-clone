import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService as MyAuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {

  router;

  // tslint:disable-next-line:variable-name
  constructor(private api: MyAuthService, _router: Router) {
    this.router = _router;
  }

  ngOnInit() {
    this.api.logout().subscribe(
      data => {
        localStorage.removeItem('currentToken');
        localStorage.removeItem('currentUser');
        this.router.navigateByUrl('/login');
        console.log("Logout success");
      },
      error => {
        console.log("Logout error" + error);
      }
    );
  }

}
