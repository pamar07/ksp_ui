import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialPublicComponent } from './social-public.component';

describe('SocialPublicComponent', () => {
  let component: SocialPublicComponent;
  let fixture: ComponentFixture<SocialPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
