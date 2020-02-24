import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebStayTunedAwards2018Component } from './web-stay-tuned-awards2018.component';

describe('WebStayTunedAwards2018Component', () => {
  let component: WebStayTunedAwards2018Component;
  let fixture: ComponentFixture<WebStayTunedAwards2018Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebStayTunedAwards2018Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebStayTunedAwards2018Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
