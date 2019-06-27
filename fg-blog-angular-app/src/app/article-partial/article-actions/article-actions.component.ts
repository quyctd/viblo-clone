import { Component, OnInit, Input } from '@angular/core';
import { PostManageService } from 'src/app/post/post-manage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-actions',
  templateUrl: './article-actions.component.html',
  styleUrls: ['./article-actions.component.css']
})
export class ArticleActionsComponent implements OnInit {

  @Input() postId: any;
  voteNumber = 0;
  voteString = "";
  isUpVote = false;
  upVoteText = "";
  isDownVote = false;
  downVoteText = "";
  isVote = false;
  userIsAuthor = false;
  postData: any;

  constructor(private postApi: PostManageService, private router: Router) { }

  ngOnInit() {
    this.getPostDataWithId(this.postId);
  }

  getPostDataWithId(id) {
    this.postApi.getPostData(id).subscribe(
      data => {
        this.postData = data;
        if (data.status === 'draft' && data.author !== this.currentUser.id ) {
          this.router.navigateByUrl('/404');
        }
        this.initInfo();
      },
      error => {
        console.log("ERROR: ", error);
        this.router.navigateByUrl('newest');
      }
    );
  }

  initInfo() {
    this.voteNumber = this.postData.vote;
    this.checkUserIsAuthor();
    this.formatVoteString();
    this.isVote = this.checkIsVote();
    this.setVoteText();
  }

  formatVoteString() {
    if (this.voteNumber > 0) {
      this.voteString = "+" + this.voteNumber;
    } else {
      this.voteString = this.voteNumber.toString();
    }
  }

  checkUserIsAuthor() {
    if (this.postData.author === this.currentUser.id ) {
      this.userIsAuthor = true;
    } else {
      this.userIsAuthor = false;
    }
  }

  checkIsVote() {
    if (this.userIsAuthor ) {
      return false;
    }
    // tslint:disable:no-string-literal
    const voteUsers = this.postData['vote_users'];
    if (voteUsers.hasOwnProperty(this.currentUser.id.toString())) {
      const currentVote = voteUsers[this.currentUser.id.toString()];
      if (currentVote === -1) {
        this.isDownVote = true;
        this.isUpVote = false;
      } else if (currentVote === 1) {
        this.isUpVote = true;
        this.isDownVote = false;
      }
      return true;
    } else {
      return false;
    }
  }

  setVoteText() {
    if (this.userIsAuthor) {
      this.upVoteText = "You cannot vote your own content";
      this.downVoteText = "You cannot vote your own content";
    } else {
      this.upVoteText = "Upvote";
      this.downVoteText = "Downvote";
    }
  }

  get currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  toggleUpvote() {
    if (this.userIsAuthor) {
      return;
    }

    if (this.isVote) {
      if (this.isUpVote) {
        this.isVote = false;
        this.isUpVote = false;
        this.isDownVote = false;
      } else if (this.isDownVote) {
        this.isVote = true;
        this.isDownVote = false;
        this.isUpVote = true;
      }
    } else {
      this.isVote = true;
      this.isUpVote = true;
      this.isDownVote = false;
    }
    this.doUpvote();
  }

  toggleDownvote() {
    if (this.userIsAuthor) {
      return;
    }

    if (this.isVote) {
      if (this.isUpVote) {
        this.isVote = true;
        this.isUpVote = false;
        this.isDownVote = true;
      } else if (this.isDownVote) {
        this.isVote = false;
        this.isDownVote = false;
        this.isUpVote = false;
      }
    } else {
      this.isVote = true;
      this.isUpVote = false;
      this.isDownVote = true;
    }
    this.doUpvote();
  }

  doUpvote() {
    // tslint:disable-next-line:prefer-const
    let voteUsers = this.postData['vote_users'];
    if (this.isVote) {
      if (this.isUpVote) {
        voteUsers[this.currentUser.id] = 1;
      } else {
        voteUsers[this.currentUser.id] = -1;
      }
    } else {
      delete voteUsers[this.currentUser.id];
    }
    const formData = {
      author: this.postData.author,
      tags: this.postData.tags,
      content: this.postData.content,
      title: this.postData.title,
      vote_users: voteUsers
    };
    this.postApi.updatePost(this.postId, formData).subscribe(
      data => {
        this.voteNumber = data.vote;
        this.formatVoteString();
      },
      error => {
        console.log("Error: ", error);
      }
    );
  }
}
