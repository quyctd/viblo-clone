import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appCustomDropdown]'
})
export class CustomDropdownDirective implements OnInit {

  isShow = false;
  currEle: any;
  dropEle: any;

  constructor(private eRef: ElementRef) { }

  ngOnInit() { }

  @HostListener('document:click', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.currEle = this.eRef.nativeElement;
    if (this.dropEle && this.dropEle.style.display === "none") {
      this.isShow = false;
    }
    if (this.eRef.nativeElement.contains(event.target)) {
      // console.log("clicked inside");
      this.doShowDropdown(this.currEle);
    } else if (this.dropEle && !this.dropEle.contains(event.target)) {
      // console.log("clicked outside");
      this.doHideDropdown(this.currEle);
    }
  }

  doShowDropdown(target) {
    const dropdownId = target.getAttribute('aria-controls');
    const placement = target.getAttribute("x-placement");
    const dropEle = document.getElementById(dropdownId);
    this.dropEle = dropEle;
    // tslint:disable:max-line-length
    if (this.isShow && dropEle) {
      // console.log("Do hidden");
      dropEle.style.display = "none";
      this.isShow = false;
    } else if (!this.isShow && dropEle) {
      // console.log("Do show");
      dropEle.style.display = "block";
      this.isShow = true;
      dropEle.style.top = target.getBoundingClientRect().bottom + "px";
      if (dropdownId.includes('share') || dropdownId.includes("comment-menu-") || dropdownId.includes("action-menu-")) {
        dropEle.style.top = window.pageYOffset + target.getBoundingClientRect().bottom + "px";
      }
      if (placement === "bottom-start") {
        dropEle.style.left = target.getBoundingClientRect().left + "px";
      } else {
        dropEle.style.left = target.getBoundingClientRect().left + target.getBoundingClientRect().width - dropEle.getBoundingClientRect().width + "px";
      }
    }
  }

  doHideDropdown(target) {
    const dropdownId = target.getAttribute('aria-controls');
    const dropEle = document.getElementById(dropdownId);
    this.isShow = false;
    if (dropEle) {
      dropEle.style.display = "none";
    }
  }

}
