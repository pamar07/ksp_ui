import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileCategorywiseArticleComponent } from './mobile-categorywise-article.component';

describe('MobileCategorywiseArticleComponent', () => {
  let component: MobileCategorywiseArticleComponent;
  let fixture: ComponentFixture<MobileCategorywiseArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileCategorywiseArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileCategorywiseArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
