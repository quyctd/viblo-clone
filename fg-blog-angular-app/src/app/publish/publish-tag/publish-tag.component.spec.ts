import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishTagComponent } from './publish-tag.component';

describe('PublishTagComponent', () => {
  let component: PublishTagComponent;
  let fixture: ComponentFixture<PublishTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
