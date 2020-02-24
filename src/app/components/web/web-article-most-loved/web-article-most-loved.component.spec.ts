import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebArticleMostLovedComponent } from './web-article-most-loved.component';

describe('WebArticleMostLovedComponent', () => {
  let component: WebArticleMostLovedComponent;
  let fixture: ComponentFixture<WebArticleMostLovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebArticleMostLovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebArticleMostLovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
