import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorywiseRadioComponent } from './categorywise-radio.component';

describe('CategorywiseRadioComponent', () => {
  let component: CategorywiseRadioComponent;
  let fixture: ComponentFixture<CategorywiseRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorywiseRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorywiseRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
