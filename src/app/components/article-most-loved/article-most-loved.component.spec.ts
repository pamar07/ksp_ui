import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleMostLovedComponent } from './article-most-loved.component';

describe('ArticleMostLovedComponent', () => {
  let component: ArticleMostLovedComponent;
  let fixture: ComponentFixture<ArticleMostLovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleMostLovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleMostLovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
