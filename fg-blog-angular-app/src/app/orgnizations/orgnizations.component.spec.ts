import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgnizationsComponent } from './orgnizations.component';

describe('OrgnizationsComponent', () => {
  let component: OrgnizationsComponent;
  let fixture: ComponentFixture<OrgnizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgnizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgnizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
