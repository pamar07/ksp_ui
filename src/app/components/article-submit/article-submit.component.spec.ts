import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSubmitComponent } from './article-submit.component';

describe('ArticleSubmitComponent', () => {
  let component: ArticleSubmitComponent;
  let fixture: ComponentFixture<ArticleSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
