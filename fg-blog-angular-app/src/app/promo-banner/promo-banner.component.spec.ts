import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoBannerComponent } from './promo-banner.component';

describe('PromoBannerComponent', () => {
  let component: PromoBannerComponent;
  let fixture: ComponentFixture<PromoBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
