import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebDashboardComponent } from './web-dashboard.component';

describe('WebDashboardComponent', () => {
  let component: WebDashboardComponent;
  let fixture: ComponentFixture<WebDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
