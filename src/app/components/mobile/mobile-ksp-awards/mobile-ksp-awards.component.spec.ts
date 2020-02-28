import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileKspAwardsComponent } from './mobile-ksp-awards.component';

describe('MobileKspAwardsComponent', () => {
  let component: MobileKspAwardsComponent;
  let fixture: ComponentFixture<MobileKspAwardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileKspAwardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileKspAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
