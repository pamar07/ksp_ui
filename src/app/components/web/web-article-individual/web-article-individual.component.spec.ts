import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebArticleIndividualComponent } from './web-article-individual.component';

describe('WebArticleIndividualComponent', () => {
  let component: WebArticleIndividualComponent;
  let fixture: ComponentFixture<WebArticleIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebArticleIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebArticleIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
