import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebRadioAllComponent } from './web-radio-all.component';

describe('WebRadioAllComponent', () => {
  let component: WebRadioAllComponent;
  let fixture: ComponentFixture<WebRadioAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebRadioAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebRadioAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
