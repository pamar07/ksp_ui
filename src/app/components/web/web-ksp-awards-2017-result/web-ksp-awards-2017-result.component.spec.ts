import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebKspAwards2017ResultComponent } from './web-ksp-awards-2017-result.component';

describe('WebKspAwards2017ResultComponent', () => {
  let component: WebKspAwards2017ResultComponent;
  let fixture: ComponentFixture<WebKspAwards2017ResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebKspAwards2017ResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebKspAwards2017ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
