import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomResultComponent } from './custom-result.component';

describe('CustomResultComponent', () => {
  let component: CustomResultComponent;
  let fixture: ComponentFixture<CustomResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
