import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorwisePostsComponent } from './authorwise-posts.component';

describe('AuthorwisePostsComponent', () => {
  let component: AuthorwisePostsComponent;
  let fixture: ComponentFixture<AuthorwisePostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorwisePostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorwisePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
