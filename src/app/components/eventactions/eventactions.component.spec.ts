import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventactionsComponent } from './eventactions.component';

describe('EventactionsComponent', () => {
  let component: EventactionsComponent;
  let fixture: ComponentFixture<EventactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
