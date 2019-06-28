import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSuggestionComponent } from './post-suggestion.component';

describe('PostSuggestionComponent', () => {
  let component: PostSuggestionComponent;
  let fixture: ComponentFixture<PostSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
