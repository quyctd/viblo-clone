import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostManageService } from '../post-manage.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  id: number;
  url: any;
  sub: any;
  postData = {};
  authorData = {};

  constructor(private postApi: PostManageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.url = this.router.url;
    this.sub = this.route.params.subscribe( params => {
      // tslint:disable-next-line:no-string-literal
      this.id = +params['id'];
    });

    this.getPostDataWithId(this.id);
  }

  getPostDataWithId(id) {
    this.postApi.getPostData(id).subscribe(
      data => {
        console.log(data);
        this.postData = data;
      },
      error => {
        console.log("ERROR: ", error);
        this.router.navigateByUrl('newest');
      }
    );
  }

  get userData() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

}
