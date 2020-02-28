import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebKspSurveyComponent } from './web-ksp-survey.component';

describe('WebKspSurveyComponent', () => {
  let component: WebKspSurveyComponent;
  let fixture: ComponentFixture<WebKspSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebKspSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebKspSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
