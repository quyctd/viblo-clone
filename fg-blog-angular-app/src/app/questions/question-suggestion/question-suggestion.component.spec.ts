import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSuggestionComponent } from './question-suggestion.component';

describe('QuestionSuggestionComponent', () => {
  let component: QuestionSuggestionComponent;
  let fixture: ComponentFixture<QuestionSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
