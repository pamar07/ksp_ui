import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSummerEventSubmitComponent } from './mobile-summer-event-submit.component';

describe('MobileSummerEventSubmitComponent', () => {
  let component: MobileSummerEventSubmitComponent;
  let fixture: ComponentFixture<MobileSummerEventSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSummerEventSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSummerEventSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
