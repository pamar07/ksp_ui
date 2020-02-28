import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebKspAwards2017Component } from './web-ksp-awards-2017.component';

describe('WebKspAwards2017Component', () => {
  let component: WebKspAwards2017Component;
  let fixture: ComponentFixture<WebKspAwards2017Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebKspAwards2017Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebKspAwards2017Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
