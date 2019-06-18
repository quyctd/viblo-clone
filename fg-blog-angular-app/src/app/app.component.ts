import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fg-blog-angular-app';

  router;
  constructor(private _router: Router) {
    this.router = _router;
  }

  ngOnInit() {
    this.router.navigateByUrl('/newest');
  }

}
