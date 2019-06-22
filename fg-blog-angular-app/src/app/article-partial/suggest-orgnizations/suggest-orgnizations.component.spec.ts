import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestOrgnizationsComponent } from './suggest-orgnizations.component';

describe('SuggestOrgnizationsComponent', () => {
  let component: SuggestOrgnizationsComponent;
  let fixture: ComponentFixture<SuggestOrgnizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestOrgnizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestOrgnizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
