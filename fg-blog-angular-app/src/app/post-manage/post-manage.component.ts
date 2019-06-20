import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostManageService } from './post-manage.service';
import { auditTime } from 'rxjs/operators';

@Component({
  selector: 'app-post-manage',
  templateUrl: '../publish/post/post.component.html',
  styleUrls: ['../publish/post/post.component.css']
})
export class PostManageComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  router;
  publishDropdown = false;
  isClickFeatureImage = false;
  isCanPublish = true;
  isSaved = true;
  id: number;
  sub: any;
  postData: any;

  // tslint:disable-next-line:variable-name
  constructor(public formBuilder: FormBuilder, public postApi: PostManageService, _router: Router, private route: ActivatedRoute) {
    this.router = _router;
  }

  ngOnInit() {
    // Init authentic
    if (localStorage.getItem('currentToken') == null) {
      this.router.navigateByUrl('/login');
    }

    this.form = this.formBuilder.group({
      simplemde : new FormControl(""),
      title : new FormControl(""),
      tags : new FormControl(""),
      visibility: new FormControl("draft")
    });

    this.sub = this.route.params.subscribe( params => {
      // tslint:disable-next-line:no-string-literal
      this.id = +params['id'];
    });
    console.log("ID route: ", this.id);
    this.getPostDataWithId(this.id);

    this.form.valueChanges.pipe(auditTime(2000)).subscribe(formData => this.autoSaveForm());

  }

  ngAfterViewInit() {
    const codeMirrorEle = (document.querySelector('.CodeMirror') as HTMLElement);
    const finalHeight = window.innerHeight - codeMirrorEle.getBoundingClientRect().top - 20;
    codeMirrorEle.style.height = finalHeight + "px";
  }

  autoSaveForm() {
    console.log("Auto save....");
    const formData = {title: this.title.value,
      tags: this.postApi.listTag,
      content: this.simplemde.value,
      status: this.visibility.value,
      author: this.postData.author
    };
    const formValid = this.checkValidForm();
    if (formValid) {
      this.doUpdatePost(formData);
    }
  }

  doUpdatePost(formData) {
    this.postApi.updatePost(this.id, formData).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log("ERROR ", error);
      }
    );
  }

  checkValidForm() {
    const title = this.title.value;
    const tags = this.postApi.listTag.length;
    const content = this.simplemde.value;
    if (title && tags && content) {
      return true;
    } else { return false; }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const codeMirrorEle = (document.querySelector('.CodeMirror') as HTMLElement);
    const finalHeight = window.innerHeight - codeMirrorEle.getBoundingClientRect().top - 35;
    codeMirrorEle.style.height = finalHeight + "px";
  }

  updateDisplayInfo(data) {
    this.form.controls.title.setValue(data.title);
    this.postApi.listTag = data.tags;
    this.form.controls.simplemde.setValue(data.content);
    this.form.controls.visibility.setValue(data.status);
  }

  get currentToken() {
    return JSON.parse(localStorage.getItem('currentToken'));
  }

  get currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  get simplemde() {
    return this.form.get('simplemde');
  }

  get visibility() {
    return this.form.get('visibility');
  }

  get title() {
    return this.form.get('title');
  }

  get tags() {
    return this.form.get('tags');
  }

  getPostDataWithId(id) {
    this.postApi.getPostData(id).subscribe(
      data => {
        console.log(data);
        this.postData = data;
        this.updateDisplayInfo(data);
      },
      error => {
        console.log("ERROR: ", error);
        this.router.navigateByUrl('publish/post');
      }
    );
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
    if (this.visibility.value == 'draft') {
      // tslint:disable:max-line-length
      return {icon: "fa fa-lock", detail: "Only you can see this post. Your draft is already saved automatically as you type.", btnText : "Save draft"};
    } else if (this.visibility.value == 'draft_public') {
      return {icon: "fa fa-eye-slash", detail: "Only those with the link to this post can see it.", btnText : "Save draft"};
    } else {
      return {icon: "fa fa-globe", detail: "Everyone can see your post.", btnText : "Publish"};
    }
  }
}
