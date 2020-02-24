import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebKspAwards2019Component } from './web-ksp-awards-2019.component';

describe('WebKspAwards2019Component', () => {
  let component: WebKspAwards2019Component;
  let fixture: ComponentFixture<WebKspAwards2019Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebKspAwards2019Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebKspAwards2019Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
