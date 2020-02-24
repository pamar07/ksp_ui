import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleMostPopularComponent } from './article-most-popular.component';

describe('ArticleMostPopularComponent', () => {
  let component: ArticleMostPopularComponent;
  let fixture: ComponentFixture<ArticleMostPopularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleMostPopularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleMostPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
