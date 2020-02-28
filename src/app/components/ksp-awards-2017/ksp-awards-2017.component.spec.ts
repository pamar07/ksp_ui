import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KspAwards2017Component } from './ksp-awards-2017.component';

describe('KspAwards2017Component', () => {
  let component: KspAwards2017Component;
  let fixture: ComponentFixture<KspAwards2017Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KspAwards2017Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KspAwards2017Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
