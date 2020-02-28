import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileCategorywiseTvComponent } from './mobile-categorywise-tv.component';

describe('MobileCategorywiseTvComponent', () => {
  let component: MobileCategorywiseTvComponent;
  let fixture: ComponentFixture<MobileCategorywiseTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileCategorywiseTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileCategorywiseTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
