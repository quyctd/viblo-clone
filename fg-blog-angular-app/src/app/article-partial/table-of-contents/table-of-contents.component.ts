import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.css']
})
export class TableOfContentsComponent implements OnInit {

  @Input() toc: any;
  @Input() url: any;

  constructor() { }

  ngOnInit() {
  }

  doScrollTo(headingId) {
    console.log(headingId);
    const bodyRect = document.body.getBoundingClientRect().top;
    const el = document.getElementById(headingId);
    const elPos = el.getBoundingClientRect().top - bodyRect;
    const navbar = document.getElementsByClassName("main-navbar main-navbar__group py-1")[0];
    const offset = navbar.getBoundingClientRect().height + 5;
    const scrollPos = elPos - offset;
    window.scrollTo({top: scrollPos, behavior: "smooth"});
  }

}
