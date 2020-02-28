import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StayTunedAwards2018Component } from './stay-tuned-awards2018.component';

describe('StayTunedAwards2018Component', () => {
  let component: StayTunedAwards2018Component;
  let fixture: ComponentFixture<StayTunedAwards2018Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StayTunedAwards2018Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StayTunedAwards2018Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
