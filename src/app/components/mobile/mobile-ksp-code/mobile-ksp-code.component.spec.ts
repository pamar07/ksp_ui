import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileKspCodeComponent } from './mobile-ksp-code.component';

describe('MobileKspCodeComponent', () => {
  let component: MobileKspCodeComponent;
  let fixture: ComponentFixture<MobileKspCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileKspCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileKspCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
