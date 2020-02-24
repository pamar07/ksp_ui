import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebBrandDashboardComponent } from './web-brand-dashboard.component';

describe('WebBrandDashboardComponent', () => {
  let component: WebBrandDashboardComponent;
  let fixture: ComponentFixture<WebBrandDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebBrandDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebBrandDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
