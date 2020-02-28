import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePublicComponent } from './article-public.component';

describe('ArticlePublicComponent', () => {
  let component: ArticlePublicComponent;
  let fixture: ComponentFixture<ArticlePublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlePublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
