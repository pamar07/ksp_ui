import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleUserComponent } from './article-user.component';

describe('ArticleUserComponent', () => {
  let component: ArticleUserComponent;
  let fixture: ComponentFixture<ArticleUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
