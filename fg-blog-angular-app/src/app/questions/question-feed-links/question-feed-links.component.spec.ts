import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFeedLinksComponent } from './question-feed-links.component';

describe('QuestionFeedLinksComponent', () => {
  let component: QuestionFeedLinksComponent;
  let fixture: ComponentFixture<QuestionFeedLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionFeedLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFeedLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
