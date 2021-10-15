import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChildProfileComponent } from './update-child-profile.component';

describe('UpdateChildProfileComponent', () => {
  let component: UpdateChildProfileComponent;
  let fixture: ComponentFixture<UpdateChildProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateChildProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChildProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
