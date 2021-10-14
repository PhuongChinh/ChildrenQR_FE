import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyMenuMobileComponent } from './sticky-menu-mobile.component';

describe('StickyMenuMobileComponent', () => {
  let component: StickyMenuMobileComponent;
  let fixture: ComponentFixture<StickyMenuMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickyMenuMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickyMenuMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
