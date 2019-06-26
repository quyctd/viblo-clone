import { Component, OnInit } from '@angular/core';
import { NewestPostsService } from './newest-posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newest',
  templateUrl: './newest-post.component.html',
  styleUrls: ['./newest-post.component.css']
})
export class NewestPostComponent implements OnInit {

  newestPost: [];
  switcherLayout = false; // false is Only title, true is with preview

  constructor(private api: NewestPostsService, private router: Router) { }

  ngOnInit() {
    // tslint:disable-next-line:triple-equals
    if (this.router.url == "/") {
      this.router.navigateByUrl('/newest');
    }
    this.getNewestPost();
  }

  getNewestPost() {
    this.api.getNewestPost().subscribe(
      data => {
        this.newestPost = data;
      },
      error => {
        console.log('Get newest post: ', error);
      }
    );
  }

  switchLayout() {
    this.switcherLayout = !this.switcherLayout;
  }

}
