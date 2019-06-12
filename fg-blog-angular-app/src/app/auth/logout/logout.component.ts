import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService as MyAuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  providers: [MyAuthService]
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
        this.api.user = null;
        this.router.navigateByUrl('/login');
        console.log("Login success");
      },
      error => {
        console.log("Logout error" + error);
      }
    );
  }

}
