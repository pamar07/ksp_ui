import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSocialPublicComponent } from './mobile-social-public.component';

describe('MobileSocialPublicComponent', () => {
  let component: MobileSocialPublicComponent;
  let fixture: ComponentFixture<MobileSocialPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSocialPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSocialPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
