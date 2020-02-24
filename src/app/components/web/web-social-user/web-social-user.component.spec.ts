import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSocialUserComponent } from './web-social-user.component';

describe('WebSocialUserComponent', () => {
  let component: WebSocialUserComponent;
  let fixture: ComponentFixture<WebSocialUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebSocialUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebSocialUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
