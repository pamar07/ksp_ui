import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebAuthorwisePostsComponent } from './web-authorwise-posts.component';

describe('WebAuthorwisePostsComponent', () => {
  let component: WebAuthorwisePostsComponent;
  let fixture: ComponentFixture<WebAuthorwisePostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebAuthorwisePostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebAuthorwisePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
