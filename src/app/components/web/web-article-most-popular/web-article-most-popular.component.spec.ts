import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebArticleMostPopularComponent } from './web-article-most-popular.component';

describe('WebArticleMostPopularComponent', () => {
  let component: WebArticleMostPopularComponent;
  let fixture: ComponentFixture<WebArticleMostPopularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebArticleMostPopularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebArticleMostPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
