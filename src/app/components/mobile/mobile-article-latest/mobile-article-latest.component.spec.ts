import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileArticleLatestComponent } from './mobile-article-latest.component';

describe('MobileArticleLatestComponent', () => {
  let component: MobileArticleLatestComponent;
  let fixture: ComponentFixture<MobileArticleLatestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileArticleLatestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileArticleLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
