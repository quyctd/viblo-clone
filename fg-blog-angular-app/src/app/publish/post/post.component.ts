import { Component, OnInit, HostListener, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PublishPostService } from '../publish-post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post',
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

  // tslint:disable-next-line:variable-name
  constructor(private formBuilder: FormBuilder, public publishService: PublishPostService, _router: Router) {
    this.router = _router;
   }

  ngOnInit() {
    this.form = this.formBuilder.group({
      simplemde : new FormControl(''),
      title : new FormControl(''),
      tags : new FormControl('')
    });
    this.form.valueChanges.subscribe(formData => this.autoSaveForm());

    // Init authentic
    console.log(localStorage.getItem('currentToken'));
    if (localStorage.getItem('currentToken') == null) {
      console.log("Do change route here");
      this.router.navigateByUrl('/login');
    }
  }

  autoSaveForm() {
    const formValid = this.checkValidForm();
    if (!formValid) {
      if (!this.isSaved) {
        this.isCanPublish = false;
      }
      return;
    } else {
      this.isCanPublish = true;
    }
  }

  checkValidForm() {
    const title = this.title.value;
    const tags = this.tags.value;
    const content = this.simplemde.value;
    if (title && tags && content) {
      return true;
    } else { return false; }
  }

  ngAfterViewInit() {
    const codeMirrorEle = (document.querySelector('.CodeMirror') as HTMLElement);
    const finalHeight = window.innerHeight - codeMirrorEle.getBoundingClientRect().top - 20;
    codeMirrorEle.style.height = finalHeight + "px";
    codeMirrorEle.style.maxHeight = finalHeight + "px";
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // this.innerWidth = window.innerWidth;
    const codeMirrorEle = (document.querySelector('.CodeMirror') as HTMLElement);
    const finalHeight = window.innerHeight - codeMirrorEle.getBoundingClientRect().top - 35;
    codeMirrorEle.style.height = finalHeight + "px";
    codeMirrorEle.style.maxHeight = finalHeight + "px";
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
    console.log(arrowEle);
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
    console.log("Clicked");
    console.log(dropEle);
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
    if (this.publishService.listTag.length < 5) {
      this.publishService.listTag.push(target.value);
    }
    console.log(this.publishService);
    target.value = "";
  }

}
