import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebEventIndividualComponent } from './web-event-individual.component';

describe('WebEventIndividualComponent', () => {
  let component: WebEventIndividualComponent;
  let fixture: ComponentFixture<WebEventIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebEventIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebEventIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
