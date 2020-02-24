import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileKspAwards2017Component } from './mobile-ksp-awards-2017.component';

describe('MobileKspAwards2017Component', () => {
  let component: MobileKspAwards2017Component;
  let fixture: ComponentFixture<MobileKspAwards2017Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileKspAwards2017Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileKspAwards2017Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
