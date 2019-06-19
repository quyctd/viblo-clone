import { Component, Input, OnInit } from '@angular/core';
import { PublishPostService } from '../publish-post.service';

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

  constructor(private publishPostService: PublishPostService) {}

  ngOnInit() {
    if (this.inputTag) {
      this.tag = this.inputTag;
    }
  }

  changeClass() {
    this.hoverClose = !this.hoverClose;
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
    }
  }

}
