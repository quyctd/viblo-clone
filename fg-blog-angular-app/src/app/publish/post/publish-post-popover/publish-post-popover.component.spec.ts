import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishPostPopoverComponent } from './publish-post-popover.component';

describe('PublishPostPopoverComponent', () => {
  let component: PublishPostPopoverComponent;
  let fixture: ComponentFixture<PublishPostPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishPostPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishPostPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
