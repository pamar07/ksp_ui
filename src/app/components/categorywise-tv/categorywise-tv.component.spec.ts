import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorywiseTvComponent } from './categorywise-tv.component';

describe('CategorywiseTvComponent', () => {
  let component: CategorywiseTvComponent;
  let fixture: ComponentFixture<CategorywiseTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorywiseTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorywiseTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
