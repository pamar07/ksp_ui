import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KspAwards2017VotingEndedComponent } from './ksp-awards2017-voting-ended.component';

describe('KspAwards2017VotingEndedComponent', () => {
  let component: KspAwards2017VotingEndedComponent;
  let fixture: ComponentFixture<KspAwards2017VotingEndedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KspAwards2017VotingEndedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KspAwards2017VotingEndedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
