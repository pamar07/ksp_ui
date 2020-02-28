import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsLikeComponent } from './comments-like.component';

describe('CommentsLikeComponent', () => {
  let component: CommentsLikeComponent;
  let fixture: ComponentFixture<CommentsLikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsLikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
