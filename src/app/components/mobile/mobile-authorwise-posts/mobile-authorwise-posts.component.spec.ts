import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAuthorwisePostsComponent } from './mobile-authorwise-posts.component';

describe('MobileAuthorwisePostsComponent', () => {
  let component: MobileAuthorwisePostsComponent;
  let fixture: ComponentFixture<MobileAuthorwisePostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAuthorwisePostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAuthorwisePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
