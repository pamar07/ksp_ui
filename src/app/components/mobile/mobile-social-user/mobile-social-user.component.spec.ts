import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSocialUserComponent } from './mobile-social-user.component';

describe('MobileSocialUserComponent', () => {
  let component: MobileSocialUserComponent;
  let fixture: ComponentFixture<MobileSocialUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSocialUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSocialUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
