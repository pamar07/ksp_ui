import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileArticleMostLovedComponent } from './mobile-article-most-loved.component';

describe('MobileArticleMostLovedComponent', () => {
  let component: MobileArticleMostLovedComponent;
  let fixture: ComponentFixture<MobileArticleMostLovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileArticleMostLovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileArticleMostLovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
