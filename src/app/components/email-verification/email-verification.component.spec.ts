import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { emailVerification } from './email-verification.component';

describe('emailVerification', () => {
  let component: emailVerification;
  let fixture: ComponentFixture<emailVerification>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ emailVerification ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(emailVerification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
