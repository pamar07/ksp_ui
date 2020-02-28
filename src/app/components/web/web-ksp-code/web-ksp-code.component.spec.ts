import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebKspCodeComponent } from './web-ksp-code.component';

describe('WebKspCodeComponent', () => {
  let component: WebKspCodeComponent;
  let fixture: ComponentFixture<WebKspCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebKspCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebKspCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
