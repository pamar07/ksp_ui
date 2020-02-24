import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileArticleMostPopularComponent } from './mobile-article-most-popular.component';

describe('MobileArticleMostPopularComponent', () => {
  let component: MobileArticleMostPopularComponent;
  let fixture: ComponentFixture<MobileArticleMostPopularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileArticleMostPopularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileArticleMostPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
