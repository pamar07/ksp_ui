import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileKspSurveyComponent } from './mobile-ksp-survey.component';

describe('MobileKspSurveyComponent', () => {
  let component: MobileKspSurveyComponent;
  let fixture: ComponentFixture<MobileKspSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileKspSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileKspSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
