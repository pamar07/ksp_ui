import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewSocialPostComponent } from './create-new-social-post.component';

describe('CreateNewSocialPostComponent', () => {
  let component: CreateNewSocialPostComponent;
  let fixture: ComponentFixture<CreateNewSocialPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewSocialPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewSocialPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
