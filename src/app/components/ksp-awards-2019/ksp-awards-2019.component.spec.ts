import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KspAwards2019Component } from './ksp-awards-2019.component';

describe('KspAwards2017Component', () => {
  let component: KspAwards2019Component;
  let fixture: ComponentFixture<KspAwards2019Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KspAwards2019Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KspAwards2019Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
