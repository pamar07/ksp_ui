import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebInlineShareComponent } from './web-inline-share.component';

describe('WebInlineShareComponent', () => {
  let component: WebInlineShareComponent;
  let fixture: ComponentFixture<WebInlineShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebInlineShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebInlineShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
