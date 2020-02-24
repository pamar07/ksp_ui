import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBrandRegistrationComponent } from './mobile-brand-registration.component';

describe('MobileBrandRegistrationComponent', () => {
  let component: MobileBrandRegistrationComponent;
  let fixture: ComponentFixture<MobileBrandRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileBrandRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileBrandRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
