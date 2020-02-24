import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopnavSocialComponent } from './topnav-social.component';

describe('TopnavSocialComponent', () => {
  let component: TopnavSocialComponent;
  let fixture: ComponentFixture<TopnavSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopnavSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopnavSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
