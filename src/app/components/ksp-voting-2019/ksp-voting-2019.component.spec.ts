import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KspVoting2019Component } from './ksp-voting-2019.component';

describe('KspVoting2019Component', () => {
  let component: KspVoting2019Component;
  let fixture: ComponentFixture<KspVoting2019Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KspVoting2019Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KspVoting2019Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
