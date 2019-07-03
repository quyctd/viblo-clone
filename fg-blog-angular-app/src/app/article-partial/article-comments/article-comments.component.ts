import { Component, OnInit, Input, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { CommentsService } from './comments.service';
import { calTimeDifference } from '../../utils/utils';
import { doScrollTo, checkIsUpdate } from '../../utils/utils';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-article-comments',
  templateUrl: './article-comments.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./article-comments.component.css']
})
export class ArticleCommentsComponent implements OnInit {

  @Input() articleId: number;
  data = [];
  editComment: any;
  baseUrl: string;

  constructor(private api: CommentsService, private cd: ChangeDetectorRef, private modalService: NgbModal) { }

  ngOnInit() {
    console.log("Post id: ", this.articleId);
    this.baseUrl = location.origin;
    this.getListComment(0);
  }

  getListComment(idToScroll) {
    this.api.getCommentOfPost(this.articleId).subscribe(
      data => {
        this.data = data;
        console.log(data);
        this.cd.detectChanges();
        if (idToScroll !== 0) {
          doScrollTo(idToScroll);
        }
      },
      error => {
        console.log("get comment: ", error);
      }
    );
  }

  getTimePublish(publishTime) {
    return calTimeDifference(publishTime);
  }

  receivePostCommentEvent(newComment) {
    this.getListComment(newComment.id);
  }

  doEditComment(commentId) {
    this.editComment = commentId;
    const commentEle = document.getElementById(commentId);
    const contentEle = commentEle.querySelector('markdown') as HTMLElement;
    const menuEle = commentEle.querySelector('footer') as HTMLElement;
    const editEle = commentEle.querySelectorAll('app-comment-form')[0] as HTMLElement;
    const replyEle = commentEle.querySelectorAll('app-comment-form')[1] as HTMLElement;
    contentEle.style.display = "none";
    menuEle.style.visibility = "hidden";
    editEle.style.display = 'block';
    replyEle.style.display = "none";
  }

  receiveDiscardEdit(commentId) {
    const commentEle = document.getElementById(commentId);
    const contentEle = commentEle.querySelector('markdown') as HTMLElement;
    const menuEle = commentEle.querySelector('footer') as HTMLElement;
    const editEle = commentEle.querySelectorAll('app-comment-form')[0] as HTMLElement;
    const replyEle = commentEle.querySelectorAll('app-comment-form')[1] as HTMLElement;
    contentEle.style.display = "block";
    menuEle.style.visibility = "visible";
    editEle.style.display = 'none';
    replyEle.style.display = "none";
  }

  doReplyComment(commentId) {
    this.editComment = commentId;
    const commentEle = document.getElementById(commentId);
    const replyEle = commentEle.querySelectorAll('app-comment-form')[1] as HTMLElement;
    replyEle.style.display = "block";
  }

  isCommentEdited(createTime, updatedTime) {
    return checkIsUpdate(createTime, updatedTime);
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  doDeleteComment(commentId) {
    this.api.deleteComment(commentId).subscribe(
      data => {
        console.log("Delete comment: ", data);
        this.getListComment(commentId);
      },
      error => {
        console.log("Delete comment: ", error);
      }
    );
  }

  doCloseShare(shareId) {
    const shareEle = document.getElementById("share-" + shareId);
    shareEle.style.display = "none";
  }

    /* To copy Text from Textbox */
    copyShareIdToClipboard(inputElement) {
      inputElement.select();
      document.execCommand('copy');
      inputElement.setSelectionRange(0, 0);
    }
}
