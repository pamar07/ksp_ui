import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileArticlePublicComponent } from './mobile-article-public.component';

describe('MobileArticlePublicComponent', () => {
  let component: MobileArticlePublicComponent;
  let fixture: ComponentFixture<MobileArticlePublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileArticlePublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileArticlePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
