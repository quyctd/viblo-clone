import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PublishPostService } from '../publish-post.service';
import { PostManageService } from '../../post/post-manage.service';

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

  constructor(private publishPostService: PublishPostService, private postManageService: PostManageService) {}

  ngOnInit() {
    if (this.inputTag) {
      this.tag = this.inputTag;
    }
  }

  doRemoveTag() {
    console.log("Remove tag");
    this.showTag = false;
    console.log("Call update to server");
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

    this.remover.next("removeTag");
  }

}
