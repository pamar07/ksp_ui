import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSocialPublicComponent } from './web-social-public.component';

describe('WebSocialPublicComponent', () => {
  let component: WebSocialPublicComponent;
  let fixture: ComponentFixture<WebSocialPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebSocialPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebSocialPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
