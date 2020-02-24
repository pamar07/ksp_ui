import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileArticleIndividualComponent } from './mobile-article-individual.component';

describe('MobileArticleIndividualComponent', () => {
  let component: MobileArticleIndividualComponent;
  let fixture: ComponentFixture<MobileArticleIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileArticleIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileArticleIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
