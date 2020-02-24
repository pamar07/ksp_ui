import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileRadioIndividualComponent } from './mobile-radio-individual.component';

describe('MobileRadioIndividualComponent', () => {
  let component: MobileRadioIndividualComponent;
  let fixture: ComponentFixture<MobileRadioIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileRadioIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileRadioIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
