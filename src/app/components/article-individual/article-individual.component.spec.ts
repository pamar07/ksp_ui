import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleIndividualComponent } from './article-individual.component';

describe('ArticleIndividualComponent', () => {
  let component: ArticleIndividualComponent;
  let fixture: ComponentFixture<ArticleIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
