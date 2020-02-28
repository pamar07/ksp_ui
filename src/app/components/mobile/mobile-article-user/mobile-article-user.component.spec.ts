import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileArticleUserComponent } from './mobile-article-user.component';

describe('MobileArticleUserComponent', () => {
  let component: MobileArticleUserComponent;
  let fixture: ComponentFixture<MobileArticleUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileArticleUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileArticleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
