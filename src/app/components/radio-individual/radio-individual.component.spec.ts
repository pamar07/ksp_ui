import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioIndividualComponent } from './radio-individual.component';

describe('RadioIndividualComponent', () => {
  let component: RadioIndividualComponent;
  let fixture: ComponentFixture<RadioIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
