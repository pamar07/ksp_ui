import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KspCodeComponent } from './ksp-code.component';

describe('KspCodeComponent', () => {
  let component: KspCodeComponent;
  let fixture: ComponentFixture<KspCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KspCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KspCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
