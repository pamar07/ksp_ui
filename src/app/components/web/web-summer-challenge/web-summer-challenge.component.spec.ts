import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSummerChallenge } from './web-summer-challenge.component';

describe('WebSummerChallenge', () => {
  let component: WebSummerChallenge;
  let fixture: ComponentFixture<WebSummerChallenge>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebSummerChallenge ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebSummerChallenge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
