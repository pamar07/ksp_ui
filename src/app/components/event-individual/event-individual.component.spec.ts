import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventIndividualComponent } from './event-individual.component';

describe('EventIndividualComponent', () => {
  let component: EventIndividualComponent;
  let fixture: ComponentFixture<EventIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
