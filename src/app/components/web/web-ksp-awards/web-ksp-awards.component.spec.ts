import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebKspAwardsComponent } from './web-ksp-awards.component';

describe('WebKspAwardsComponent', () => {
  let component: WebKspAwardsComponent;
  let fixture: ComponentFixture<WebKspAwardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebKspAwardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebKspAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
