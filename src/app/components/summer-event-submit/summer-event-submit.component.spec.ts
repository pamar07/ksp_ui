import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummerEventSubmitComponent } from './summer-event-submit.component';

describe('SummerEventSubmitComponent', () => {
  let component: SummerEventSubmitComponent;
  let fixture: ComponentFixture<SummerEventSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummerEventSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummerEventSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
