import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() currRoute: any;
  @Input() previousPage: number;
  @Input() nextPage: number;
  @Input() currPage: number;
  @Input() numPages: number;

  constructor() { }

  ngOnInit() {
  }

  counter(i: number) {
    const arr = Array.from({length: i}, (v, k) => k + 1);
    return arr;
  }
}
