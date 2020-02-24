import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebArticleLatestComponent } from './web-article-latest.component';

describe('WebArticleLatestComponent', () => {
  let component: WebArticleLatestComponent;
  let fixture: ComponentFixture<WebArticleLatestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebArticleLatestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebArticleLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
