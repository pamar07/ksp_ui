import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialUserComponent } from './social-user.component';

describe('SocialUserComponent', () => {
  let component: SocialUserComponent;
  let fixture: ComponentFixture<SocialUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
