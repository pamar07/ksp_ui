import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebEventSubmitComponent } from './web-event-submit.component';

describe('WebEventSubmitComponent', () => {
  let component: WebEventSubmitComponent;
  let fixture: ComponentFixture<WebEventSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebEventSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebEventSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
