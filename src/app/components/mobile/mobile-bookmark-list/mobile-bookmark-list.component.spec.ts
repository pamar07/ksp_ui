import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBookmarkListComponent } from './mobile-bookmark-list.component';

describe('MobileBookmarkListComponent', () => {
  let component: MobileBookmarkListComponent;
  let fixture: ComponentFixture<MobileBookmarkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileBookmarkListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileBookmarkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
