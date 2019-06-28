import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFeedLinksComponent } from './post-feed-links.component';

describe('PostFeedLinksComponent', () => {
  let component: PostFeedLinksComponent;
  let fixture: ComponentFixture<PostFeedLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFeedLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFeedLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
