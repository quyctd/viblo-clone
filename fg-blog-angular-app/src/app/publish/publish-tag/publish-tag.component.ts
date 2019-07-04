import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PublishPostService } from '../publish-post.service';
import { PostManageService } from '../../post/post-manage.service';
import { AskQuestionService } from '../ask-question.service';

@Component({
  selector: 'app-publish-tag',
  templateUrl: './publish-tag.component.html',
  styleUrls: ['./publish-tag.component.css']
})
export class PublishTagComponent implements OnInit {

  hoverClose = false;
  showTag = true;
  tag = "";
  @Input() inputTag: string;
  @Input() postType: string;
  @Output() remover = new EventEmitter<string>();

  // tslint:disable-next-line:max-line-length
  constructor(private publishPostService: PublishPostService, private questionService: AskQuestionService, private postManageService: PostManageService) {}

  ngOnInit() {
    if (this.inputTag) {
      this.tag = this.inputTag;
    }
  }

  doRemoveTag() {
    this.showTag = false;
    if (this.postType === "post") {
      for (let i = 0; i < this.publishPostService.listTag.length; i++) {
        if (this.publishPostService.listTag[i] === this.tag) {
          this.publishPostService.listTag.splice(i, 1);
          break;
        }
      }

      for (let i = 0; i < this.postManageService.listTag.length; i++) {
        if (this.postManageService.listTag[i] === this.tag) {
          this.postManageService.listTag.splice(i, 1);
          break;
        }
      }
    }

    if (this.postType === "question") {
      for (let i = 0; i < this.questionService.listTag.length; i++) {
        if (this.questionService.listTag[i] === this.tag) {
          this.questionService.listTag.splice(i, 1);
          break;
        }
      }
    }

    this.remover.next("removeTag");
  }

}
