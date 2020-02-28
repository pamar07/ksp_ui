import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreLoginRegisterComponent } from './pre-login-register.component';

describe('PreLoginRegisterComponent', () => {
  let component: PreLoginRegisterComponent;
  let fixture: ComponentFixture<PreLoginRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreLoginRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreLoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
