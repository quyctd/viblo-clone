import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { calTimeDifference, calReadTime } from '../../utils/utils';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

  id: number;
  url: any;
  sub: any;
  questionData = {};
  isFollow = false;

  isUpVote = false;
  upVoteText = "";

  isDownVote = false;
  downVoteText = "";

  voteNumber = 0;
  voteString = "";

  userIsAuthor = false;

  isClip = false;
  clipId = null;

  constructor(private route: ActivatedRoute, private router: Router, private questionApi: QuestionService) { }

  ngOnInit() {
    this.url = this.router.url;
    this.sub = this.route.params.subscribe( params => {
      // tslint:disable-next-line:no-string-literal
      this.id = +params['id'];
    });

    this.getQuestionDataWithId(this.id);
  }

  getQuestionDataWithId(questionId) {
    this.questionApi.getQuestionData(questionId).subscribe(
      data => {
        console.log(data);
        this.questionData = data;
        this.updateViewCount();
        this.initInfo();
      },
      error => {
        console.log("ERROR: ", error);
        this.router.navigateByUrl('newest');
      }
    );
  }

  initInfo() {
    // tslint:disable-next-line:no-string-literal
    this.voteNumber = this.questionData['vote'];
    this.checkUserIsAuthor();
    this.formatVoteString();
    this.checkIsVote();
    this.setVoteText();
  }

  checkUserIsAuthor() {
    // tslint:disable-next-line:no-string-literal
    if (this.questionData['author'] === this.userData.id ) {
      this.userIsAuthor = true;
    } else {
      this.userIsAuthor = false;
    }
  }

  checkIsVote() {
    if (this.userIsAuthor ) {
      return;
    }
    // tslint:disable:no-string-literal
    const voteUsers = this.questionData['vote_users'];
    if (voteUsers.hasOwnProperty(this.userData.id.toString())) {
      const currentVote = voteUsers[this.userData.id.toString()];
      if (currentVote === -1) {
        this.isDownVote = true;
        this.isUpVote = false;
      } else if (currentVote === 1) {
        this.isUpVote = true;
        this.isDownVote = false;
      }
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

  toggleUpvote() {
    if (this.userIsAuthor) {
      return;
    }

    if (this.isUpVote) {
      this.isUpVote = false;
      this.isDownVote = false;
    } else if (this.isDownVote) {
      this.isDownVote = false;
      this.isUpVote = true;
    } else {
      this.isUpVote = true;
      this.isDownVote = false;
    }
    this.doUpvote();
  }

  toggleDownvote() {
    if (this.userIsAuthor) {
      return;
    }

    if (this.isUpVote) {
      this.isUpVote = false;
      this.isDownVote = true;
    } else if (this.isDownVote) {
      this.isDownVote = false;
      this.isUpVote = false;
    } else {
    this.isUpVote = false;
    this.isDownVote = true;
    }
    this.doUpvote();
  }

  doUpvote() {
    // tslint:disable-next-line:prefer-const
    let voteUsers = this.questionData['vote_users'];

    if (this.isUpVote) {
      voteUsers[this.userData.id] = 1;
    } else if (this.isDownVote) {
      voteUsers[this.userData.id] = -1;
    } else {
      delete voteUsers[this.userData.id];
    }
    const formData = {
      author: this.questionData['author'],
      tags: this.questionData['tags'],
      content: this.questionData['content'],
      title: this.questionData['title'],
      vote_users: voteUsers
    };
    this.questionApi.updateQuestion(this.id, formData).subscribe(
      data => {
        this.voteNumber = data.vote;
        this.formatVoteString();
      },
      error => {
        console.log("Error: ", error);
      }
    );
  }

  updateViewCount() {
    // tslint:disable:no-string-literal
    // tslint:disable:variable-name

    const viewUserId = this.userData.id;
    // tslint:disable-next-line:triple-equals
    if (viewUserId == this.questionData['author']) {
      return;
    }
    // tslint:disable-next-line:prefer-const
    let view_users = this.questionData['views_id']['view_users'];
    if (view_users.includes(viewUserId)) {
      return;
    }
    view_users.push(viewUserId);
    // tslint:disable-next-line:object-literal-shorthand
    const new_view_users = {view_users: view_users};
    const formData = {
      author: this.questionData['author'],
      content: this.questionData['content'],
      tags: this.questionData['tags'],
      title: this.questionData['title'],
      views_id: new_view_users
    };
    this.questionApi.updateQuestion(this.id, formData).subscribe(
      data => {
        this.questionData['views'] = data.views;
      },
      error => {
        console.log("Update error", error);
      }
    );
  }

  getTimePublish(publishDay) {
    return calTimeDifference(publishDay);
  }

  get userData() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  get currToken() {
    return JSON.parse(localStorage.getItem('currentToken'));
  }

  toggeFollow() {
    this.isFollow = !this.isFollow;
    // Future: Do follow here;
  }

  get followText() {
    if (this.isFollow) {
      return "Following";
    } else {
      return "Follow";
    }
  }

  formatVoteString() {
    if (this.voteNumber > 0) {
      this.voteString = "+" + this.voteNumber;
    } else {
      this.voteString = this.voteNumber.toString();
    }
  }

  getPostClipData(postId, userId) {
    this.questionApi.findQuestionClipData(postId, userId).subscribe(
      data => {
        this.isClip = data.status;
        this.clipId = data.clip_id;
      },
      error => {
        console.log("Error", error);
      }
    );
  }

  toggleClipQuestion() {
    if (this.userIsAuthor) {
      this.isClip = !this.isClip;
      return;
    } else {
      if (this.isClip) {
        // do delete in model
        this.questionApi.deleteQuestionClip(this.clipId).subscribe(
          data => {
            this.isClip = false;
            this.clipId = null;
            this.questionData['clips'] -= 1;
          },
          error => {
            console.log("Error: ", error);
          }
        );
      } else {
        // do create in model
        this.questionApi.createQuestionClip(this.id, this.userData.id).subscribe(
          data => {
            this.isClip = true;
            this.clipId = data.id;
            this.questionData['clips'] += 1;
          },
          error => {
            console.log("Error", error);
          }
        );
      }
    }
  }

  get clipQuestionText() {
    if (this.isClip) {
      return "unclip this question";
    } else {
      return "clip this question";
    }
  }
}
