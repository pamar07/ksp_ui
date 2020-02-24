import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileRadioAllComponent } from './mobile-radio-all.component';

describe('MobileRadioAllComponent', () => {
  let component: MobileRadioAllComponent;
  let fixture: ComponentFixture<MobileRadioAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileRadioAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileRadioAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
