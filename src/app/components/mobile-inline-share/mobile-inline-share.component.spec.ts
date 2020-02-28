import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileInlineShareComponent } from './mobile-inline-share.component';

describe('MobileInlineShareComponent', () => {
  let component: MobileInlineShareComponent;
  let fixture: ComponentFixture<MobileInlineShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileInlineShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileInlineShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
