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
        if (data.status === 'draft' && this.userData.id !== data.author) {
          this.router.navigateByUrl('/404');
        }
        this.updateViewPost();
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

  updateViewPost() {
    // tslint:disable:no-string-literal
    // tslint:disable:variable-name

    const viewUserId = this.userData.id;
    // tslint:disable-next-line:triple-equals
    if (viewUserId == this.postData['author']) {
      return;
    }
    // tslint:disable-next-line:prefer-const
    let view_users = this.postData['views_id']['view_users'];
    if (view_users.includes(viewUserId)) {
      return;
    }
    view_users.push(viewUserId);
    // tslint:disable-next-line:object-literal-shorthand
    const new_view_users = {view_users: view_users};
    const formData = {
      author: this.postData['author'],
      content: this.postData['content'],
      tags: this.postData['tags'],
      title: this.postData['title'],
      views_id: new_view_users
    };
    this.postApi.updatePost(this.id, formData).subscribe(
      data => {
        this.postData['views'] = data.views;
      },
      error => {
        console.log("Update error", error);
      }
    );
  }

  receiveClipEvent(clips) {
    this.postData.clips = clips;
  }
}

