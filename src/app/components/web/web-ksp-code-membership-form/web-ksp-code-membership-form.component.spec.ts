import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebKspCodeMembershipFormComponent } from './web-ksp-code-membership-form.component';

describe('WebKspCodeMembershipFormComponent', () => {
  let component: WebKspCodeMembershipFormComponent;
  let fixture: ComponentFixture<WebKspCodeMembershipFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebKspCodeMembershipFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebKspCodeMembershipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
