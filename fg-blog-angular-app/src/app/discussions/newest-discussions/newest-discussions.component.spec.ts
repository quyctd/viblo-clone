import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestDiscussionsComponent } from './newest-discussions.component';

describe('NewestDiscussionsComponent', () => {
  let component: NewestDiscussionsComponent;
  let fixture: ComponentFixture<NewestDiscussionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewestDiscussionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewestDiscussionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
