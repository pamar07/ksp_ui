import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileEventIndividualComponent } from './mobile-event-individual.component';

describe('MobileEventIndividualComponent', () => {
  let component: MobileEventIndividualComponent;
  let fixture: ComponentFixture<MobileEventIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileEventIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileEventIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
