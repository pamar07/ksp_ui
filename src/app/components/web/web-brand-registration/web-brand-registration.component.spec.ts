import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebBrandRegistrationComponent } from './web-brand-registration.component';

describe('WebBrandRegistrationComponent', () => {
  let component: WebBrandRegistrationComponent;
  let fixture: ComponentFixture<WebBrandRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebBrandRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebBrandRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
