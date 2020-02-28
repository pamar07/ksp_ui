import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorywiseArticleComponent } from './categorywise-article.component';

describe('CategorywiseArticleComponent', () => {
  let component: CategorywiseArticleComponent;
  let fixture: ComponentFixture<CategorywiseArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorywiseArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorywiseArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
