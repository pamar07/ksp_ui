import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCategorywiseArticleComponent } from './web-categorywise-article.component';

describe('WebCategorywiseArticleComponent', () => {
  let component: WebCategorywiseArticleComponent;
  let fixture: ComponentFixture<WebCategorywiseArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebCategorywiseArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebCategorywiseArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
