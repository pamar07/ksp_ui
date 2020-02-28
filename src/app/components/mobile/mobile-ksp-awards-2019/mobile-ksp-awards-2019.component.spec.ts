import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileKspAwards2019Component } from './mobile-ksp-awards-2019.component';

describe('MobileKspAwards2017Component', () => {
  let component: MobileKspAwards2019Component;
  let fixture: ComponentFixture<MobileKspAwards2019Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileKspAwards2019Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileKspAwards2019Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
