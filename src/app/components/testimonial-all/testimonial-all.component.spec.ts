import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialAllComponent } from './testimonial-all.component';

describe('TestimonialAllComponent', () => {
  let component: TestimonialAllComponent;
  let fixture: ComponentFixture<TestimonialAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonialAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
