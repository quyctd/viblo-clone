import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFollowingsComponent } from './post-followings.component';

describe('PostFollowingsComponent', () => {
  let component: PostFollowingsComponent;
  let fixture: ComponentFixture<PostFollowingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFollowingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFollowingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
