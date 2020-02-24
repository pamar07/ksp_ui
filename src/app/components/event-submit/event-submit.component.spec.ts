import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSubmitComponent } from './event-submit.component';

describe('EventSubmitComponent', () => {
  let component: EventSubmitComponent;
  let fixture: ComponentFixture<EventSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
