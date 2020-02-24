import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileKspCodeMembershipFormComponent } from './mobile-ksp-code-membership-form.component';

describe('MobileKspCodeMembershipFormComponent', () => {
  let component: MobileKspCodeMembershipFormComponent;
  let fixture: ComponentFixture<MobileKspCodeMembershipFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileKspCodeMembershipFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileKspCodeMembershipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
