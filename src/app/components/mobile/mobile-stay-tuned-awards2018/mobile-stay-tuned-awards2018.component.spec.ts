import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileStayTunedAwards2018Component } from './mobile-stay-tuned-awards2018.component';

describe('MobileStayTunedAwards2018Component', () => {
  let component: MobileStayTunedAwards2018Component;
  let fixture: ComponentFixture<MobileStayTunedAwards2018Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileStayTunedAwards2018Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileStayTunedAwards2018Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
