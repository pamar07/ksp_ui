import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileUserProfileComponent } from './mobile-user-profile.component';

describe('MobileUserProfileComponent', () => {
  let component: MobileUserProfileComponent;
  let fixture: ComponentFixture<MobileUserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileUserProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
