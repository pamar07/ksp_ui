import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCarouselComponent } from './article-carousel.component';

describe('ArticleCarouselComponent', () => {
  let component: ArticleCarouselComponent;
  let fixture: ComponentFixture<ArticleCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
