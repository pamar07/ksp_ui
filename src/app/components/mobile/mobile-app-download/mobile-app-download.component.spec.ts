import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAppDownloadComponent } from './mobile-app-download.component';

describe('MobileAppDownloadComponent', () => {
  let component: MobileAppDownloadComponent;
  let fixture: ComponentFixture<MobileAppDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAppDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAppDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
