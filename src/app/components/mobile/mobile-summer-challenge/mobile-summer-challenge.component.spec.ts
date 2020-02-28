import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSummerChallenge } from './mobile-summer-challenge.component';

describe('MobileSummerChallenge', () => {
  let component: MobileSummerChallenge;
  let fixture: ComponentFixture<MobileSummerChallenge>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSummerChallenge ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSummerChallenge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
