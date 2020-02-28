import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebArticleUserComponent } from './web-article-user.component';

describe('WebArticleUserComponent', () => {
  let component: WebArticleUserComponent;
  let fixture: ComponentFixture<WebArticleUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebArticleUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebArticleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
