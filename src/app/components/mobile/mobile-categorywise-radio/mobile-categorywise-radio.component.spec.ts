import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileCategorywiseRadioComponent } from './mobile-categorywise-radio.component';

describe('MobileCategorywiseRadioComponent', () => {
  let component: MobileCategorywiseRadioComponent;
  let fixture: ComponentFixture<MobileCategorywiseRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileCategorywiseRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileCategorywiseRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
