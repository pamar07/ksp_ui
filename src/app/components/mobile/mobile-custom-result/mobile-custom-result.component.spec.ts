import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileCustomResultComponent } from './mobile-custom-result.component';

describe('MobileCustomResultComponent', () => {
  let component: MobileCustomResultComponent;
  let fixture: ComponentFixture<MobileCustomResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileCustomResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileCustomResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
