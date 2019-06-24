import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestPostComponent } from './newest-post.component';

describe('NewestPostComponent', () => {
  let component: NewestPostComponent;
  let fixture: ComponentFixture<NewestPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewestPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewestPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
