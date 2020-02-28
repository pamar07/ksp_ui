import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebArticlePublicComponent } from './web-article-public.component';

describe('WebArticlePublicComponent', () => {
  let component: WebArticlePublicComponent;
  let fixture: ComponentFixture<WebArticlePublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebArticlePublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebArticlePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
