import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileEventSubmitComponent } from './mobile-event-submit.component';

describe('MobileEventSubmitComponent', () => {
  let component: MobileEventSubmitComponent;
  let fixture: ComponentFixture<MobileEventSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileEventSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileEventSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
