import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebKspVoting2019Component } from './web-ksp-voting-2019.component';

describe('WebKspVoting2019Component', () => {
  let component: WebKspVoting2019Component;
  let fixture: ComponentFixture<WebKspVoting2019Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebKspVoting2019Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebKspVoting2019Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
