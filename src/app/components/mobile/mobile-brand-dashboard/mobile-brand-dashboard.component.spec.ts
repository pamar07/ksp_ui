import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBrandDashboardComponent } from './mobile-brand-dashboard.component';

describe('MobileBrandDashboardComponent', () => {
  let component: MobileBrandDashboardComponent;
  let fixture: ComponentFixture<MobileBrandDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileBrandDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileBrandDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
