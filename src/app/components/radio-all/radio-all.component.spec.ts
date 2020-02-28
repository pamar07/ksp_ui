import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioAllComponent } from './radio-all.component';

describe('RadioAllComponent', () => {
  let component: RadioAllComponent;
  let fixture: ComponentFixture<RadioAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
