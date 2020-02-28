import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSummerEventSubmitComponent } from './web-summer-event-submit.component';

describe('WebSummerEventSubmitComponent', () => {
  let component: WebSummerEventSubmitComponent;
  let fixture: ComponentFixture<WebSummerEventSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebSummerEventSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebSummerEventSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
