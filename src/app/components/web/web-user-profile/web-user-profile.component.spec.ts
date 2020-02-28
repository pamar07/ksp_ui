import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebUserProfileComponent } from './web-user-profile.component';

describe('WebUserProfileComponent', () => {
  let component: WebUserProfileComponent;
  let fixture: ComponentFixture<WebUserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebUserProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
