import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileEventAllComponent } from './mobile-event-all.component';

describe('MobileEventAllComponent', () => {
  let component: MobileEventAllComponent;
  let fixture: ComponentFixture<MobileEventAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileEventAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileEventAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
