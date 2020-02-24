import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KspSurveyComponent } from './ksp-survey.component';

describe('KspSurveyComponent', () => {
  let component: KspSurveyComponent;
  let fixture: ComponentFixture<KspSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KspSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KspSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
