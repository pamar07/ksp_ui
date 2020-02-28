import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostIndividualComponent } from './post-individual.component';

describe('PostIndividualComponent', () => {
  let component: PostIndividualComponent;
  let fixture: ComponentFixture<PostIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
