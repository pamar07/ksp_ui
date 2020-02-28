import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikecommentComponent } from './likecomment.component';

describe('LikecommentComponent', () => {
  let component: LikecommentComponent;
  let fixture: ComponentFixture<LikecommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikecommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikecommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
