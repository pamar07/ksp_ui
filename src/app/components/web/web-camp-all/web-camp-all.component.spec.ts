import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCampAllComponent } from './web-camp-all.component';

describe('WebCampAllComponent', () => {
  let component: WebCampAllComponent;
  let fixture: ComponentFixture<WebCampAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebCampAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebCampAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
