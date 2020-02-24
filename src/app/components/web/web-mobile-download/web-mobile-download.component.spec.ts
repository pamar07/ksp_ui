import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebMobileDownloadComponent } from './web-mobile-download.component';

describe('WebMobileDownloadComponent', () => {
  let component: WebMobileDownloadComponent;
  let fixture: ComponentFixture<WebMobileDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebMobileDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebMobileDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
