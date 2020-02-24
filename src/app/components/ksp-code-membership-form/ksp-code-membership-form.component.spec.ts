import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KspCodeMembershipFormComponent } from './ksp-code-membership-form.component';

describe('KspCodeMembershipFormComponent', () => {
  let component: KspCodeMembershipFormComponent;
  let fixture: ComponentFixture<KspCodeMembershipFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KspCodeMembershipFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KspCodeMembershipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
