import { Component, OnInit } from '@angular/core';
import { NewestPostsService } from './newest-posts.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newest',
  templateUrl: './newest-post.component.html',
  styleUrls: ['./newest-post.component.css']
})
export class NewestPostComponent implements OnInit {

  newestPost: [];
  currPage = 1;
  numPages: number;
  pageSize: number;
  nextPage: number;
  previousPage: number;

  constructor(private api: NewestPostsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      // tslint:disable-next-line:no-string-literal
      let currPage = params['page'];
      if (currPage === undefined) {
        currPage = 1;
      }
      this.currPage = parseInt(currPage, 10);
      // tslint:disable-next-line:triple-equals
      if (this.router.url == "/") {
        this.router.navigateByUrl('/newest');
      }
      this.getNewestPost();
  });
  }

  getNewestPost() {
    this.api.getNewestPost(this.currPage).subscribe(
      data => {
        this.pageSize = data.page_size;
        this.numPages = data.num_pages;
        this.newestPost = data.results;
        this.nextPage = this.currPage === this.numPages ? 0 : this.currPage + 1;
        this.previousPage = this.currPage === 1 ? 0 : this.currPage - 1;
      },
      error => {
        console.log('Get newest post: ', error);
        this.router.navigateByUrl('/newest');
      }
    );
  }

}
