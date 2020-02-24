import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileKspVoting2019Component } from './mobile-ksp-voting-2019.component';

describe('MobileKspVoting2019Component', () => {
  let component: MobileKspVoting2019Component;
  let fixture: ComponentFixture<MobileKspVoting2019Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileKspVoting2019Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileKspVoting2019Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
