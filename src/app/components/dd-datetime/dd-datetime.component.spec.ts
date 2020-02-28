import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdDatetimeComponent } from './dd-datetime.component';

describe('DdDatetimeComponent', () => {
  let component: DdDatetimeComponent;
  let fixture: ComponentFixture<DdDatetimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdDatetimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
