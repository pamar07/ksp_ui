import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummerChallengeComponent } from './summer-challenge.component';

describe('SummerChallengeComponent', () => {
  let component: SummerChallengeComponent;
  let fixture: ComponentFixture<SummerChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummerChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummerChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
