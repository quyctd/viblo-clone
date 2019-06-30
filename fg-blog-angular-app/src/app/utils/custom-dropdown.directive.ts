import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appCustomDropdown]'
})
export class CustomDropdownDirective implements OnInit {

  isShow = false;
  currEle: any;

  constructor(private eRef: ElementRef) { }

  ngOnInit() { }

  @HostListener('document:click', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.currEle = this.eRef.nativeElement;
    if (this.eRef.nativeElement.contains(event.target)) {
      // console.log("clicked inside");
      this.doShowDropdown(this.currEle);
    } else {
      // console.log("clicked outside");
      this.doHideDropdown(this.currEle);
    }
  }

  doShowDropdown(target) {
    const dropdownId = target.getAttribute('aria-controls');
    const dropEle = document.getElementById(dropdownId);
    // tslint:disable:max-line-length
    dropEle.style.left = target.getBoundingClientRect().left + target.getBoundingClientRect().width - dropEle.getBoundingClientRect().width + "px";
    if (this.isShow && dropEle) {
      // console.log("Do hidden");
      dropEle.style.display = "none";
      this.isShow = false;
    } else if (!this.isShow && dropEle) {
      // console.log("Do show");
      dropEle.style.display = "block";
      this.isShow = true;
      dropEle.style.top = target.getBoundingClientRect().bottom + "px";
      if (dropdownId.includes('share')) {
        dropEle.style.top = window.pageYOffset + target.getBoundingClientRect().bottom + "px";
      }
      dropEle.style.left = target.getBoundingClientRect().left + target.getBoundingClientRect().width - dropEle.getBoundingClientRect().width + "px";
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
