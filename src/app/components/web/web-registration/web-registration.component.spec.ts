import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebRegistrationComponent } from './web-registration.component';

describe('WebRegistrationComponent', () => {
  let component: WebRegistrationComponent;
  let fixture: ComponentFixture<WebRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
