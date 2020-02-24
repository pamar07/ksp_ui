import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebRadioIndividualComponent } from './web-radio-individual.component';

describe('WebRadioIndividualComponent', () => {
  let component: WebRadioIndividualComponent;
  let fixture: ComponentFixture<WebRadioIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebRadioIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebRadioIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
