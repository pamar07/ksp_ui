import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCategorywiseRadioComponent } from './web-categorywise-radio.component';

describe('WebCategorywiseRadioComponent', () => {
  let component: WebCategorywiseRadioComponent;
  let fixture: ComponentFixture<WebCategorywiseRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebCategorywiseRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebCategorywiseRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
