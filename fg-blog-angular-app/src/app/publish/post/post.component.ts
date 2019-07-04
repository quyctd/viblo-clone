import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { PublishPostService } from '../publish-post.service';
import {Router} from '@angular/router';
import { auditTime } from 'rxjs/operators';

@Component({
  selector: 'app-publish-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  router;
  publishDropdown = false;
  isClickFeatureImage = false;
  isCanPublish = false;
  isSaved = false;
  savedTime = "";
  customize: any;
  visibility = 'draft';

  // tslint:disable-next-line:variable-name
  constructor(public formBuilder: FormBuilder, public postApi: PublishPostService, _router: Router) {
    this.router = _router;
   }

  ngOnInit() {
    this.form = this.formBuilder.group({
      simplemde : new FormControl(""),
      title : new FormControl(""),
      tags : new FormControl("")

    });
    this.form.valueChanges.pipe(auditTime(2000)).subscribe(formData => this.autoSaveForm(formData));

    // Init authentic
    if (localStorage.getItem('currentToken') == null) {
      this.router.navigateByUrl('/login');
    }
  }

  get currentToken() {
    return JSON.parse(localStorage.getItem('currentToken'));
  }

  get currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }


  autoSaveForm(formData) {
    console.log("FormData", formData, this.isSaved);
    const formValid = this.checkValidForm();
    if (!formValid) {
      if (!this.isSaved) {
        this.isCanPublish = false;
      }
      return;
    } else {
      if (this.isSaved) {
        this.doUpdatePost();
        this.isCanPublish = true;
      } else {
        this.doCreatePost();
      }
    }
  }

  doCreatePost() {
    const title = this.title.value;
    const tags = this.postApi.listTag;
    const content = this.simplemde.value;
    const author = this.currentUser.id;
    // tslint:disable-next-line:object-literal-shorthand
    const formData = {title: title, tags: tags, content: content, author: author};
    this.postApi.createPost(formData).subscribe(
      data => {
        console.log("Create success", data);
        this.isSaved = true;
        this.isCanPublish = true;
        const postId = data.id;
        const nextUrl = `posts/${postId}/edit`;
        this.router.navigateByUrl(nextUrl);
      },
      error => {
        console.log("Login error");
      }
    );
  }

  doUpdatePost() {
    const formData = {};
    console.log("Donothing for now");
  }

  checkValidForm() {
    const title = this.title.value;
    const tags = this.postApi.listTag.length;
    const content = this.simplemde.value;
    if (title && tags && content) {
      return true;
    } else { return false; }
  }

  ngAfterViewInit() {
    const codeMirrorEle = (document.querySelector('.CodeMirror') as HTMLElement);
    const finalHeight = window.innerHeight - codeMirrorEle.getBoundingClientRect().top - 20;
    codeMirrorEle.style.height = finalHeight + "px";
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // this.innerWidth = window.innerWidth;
    const codeMirrorEle = (document.querySelector('.CodeMirror') as HTMLElement);
    const finalHeight = window.innerHeight - codeMirrorEle.getBoundingClientRect().top - 35;
    codeMirrorEle.style.height = finalHeight + "px";
  }

  get simplemde() {
    return this.form.get('simplemde');
  }

  get title() {
    return this.form.get('title');
  }

  get tags() {
    return this.form.get('tags');
  }

  togglePublish(event) {
    this.publishDropdown = !this.publishDropdown;

    const target = event.currentTarget;
    const userDropEle = document.getElementById("el-popover-6806");
    const arrowEle = userDropEle.querySelector('.popper__arrow') as HTMLScriptElement;
    if (this.publishDropdown) {
      userDropEle.style.display = 'block';
    } else {
      userDropEle.style.display = 'none';
    }
    const topPos = target.getBoundingClientRect().bottom;
    const arrowPos = userDropEle.getBoundingClientRect().width - target.getBoundingClientRect().width / 2;
    userDropEle.style.top = topPos + "px";
    userDropEle.style.right =  "15px";
    arrowEle.style.left = arrowPos + "px";
  }

  clickOutsidePublish(event) {
    const target = event.target;
    const userDropEle = document.getElementById("el-popover-6806");
    if (userDropEle.contains(target)) {
      return;
    } else {
      this.publishDropdown = false;
      userDropEle.style.display = 'none';
    }
  }

  toggleFeatureImage(event) {
    this.isClickFeatureImage = !this.isClickFeatureImage;

    const target = event.currentTarget;
    const dropEle = document.getElementById("el-popover-2400");
    // const arrowEle = dropEle.querySelector('.popper__arrow');
    if (this.isClickFeatureImage) {
      dropEle.style.display = 'block';
    } else {
      dropEle.style.display = 'none';
    }
    const topPos = target.getBoundingClientRect().bottom;
    const arrowPos = dropEle.getBoundingClientRect().width - target.getBoundingClientRect().width / 2;
    dropEle.style.top = topPos + "px";
    dropEle.style.right = (dropEle.getBoundingClientRect().width - target.getBoundingClientRect().width - 80) + "px";
    // arrowEle.style.left = arrowPos + "px";
  }

  clickOutsideFeatureImage(event) {
    const target = event.target;
    const dropEle = document.getElementById("el-popover-2400");
    if (dropEle.contains(target)) {
      return;
    } else {
      this.isClickFeatureImage = false;
      dropEle.style.display = 'none';
    }
  }

  addTag(event) {
    const target = event.currentTarget;
    if (this.postApi.listTag.length < 5) {
      this.postApi.listTag.push(target.value);
    }
    target.value = "";
  }

  get visibilityExplain() {
    // tslint:disable:triple-equals
    if (this.visibility == 'draft') {
      // tslint:disable:max-line-length
      return {icon: "fa fa-lock", detail: "Only you can see this post. Your draft is already saved automatically as you type.", btnText : "Save draft"};
    } else if (this.visibility == 'draft_public') {
      return {icon: "fa fa-eye-slash", detail: "Only those with the link to this post can see it.", btnText : "Save draft"};
    } else {
      return {icon: "fa fa-globe", detail: "Everyone can see your post.", btnText : "Publish"};
    }
  }

  changeVisibility(status) {
    this.visibility = status;
  }

  doUpdatePostStatus() {
  }

}
