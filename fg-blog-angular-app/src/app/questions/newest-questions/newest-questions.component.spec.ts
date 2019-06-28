import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestQuestionsComponent } from './newest-questions.component';

describe('NewestQuestionsComponent', () => {
  let component: NewestQuestionsComponent;
  let fixture: ComponentFixture<NewestQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewestQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewestQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
