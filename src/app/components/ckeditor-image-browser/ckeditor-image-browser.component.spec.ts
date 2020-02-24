import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CkeditorImageBrowserComponent } from './ckeditor-image-browser.component';

describe('CkeditorImageBrowserComponent', () => {
  let component: CkeditorImageBrowserComponent;
  let fixture: ComponentFixture<CkeditorImageBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CkeditorImageBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CkeditorImageBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
