import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebPostIndividualComponent } from './web-post-individual.component';

describe('WebPostIndividualComponent', () => {
  let component: WebPostIndividualComponent;
  let fixture: ComponentFixture<WebPostIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebPostIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebPostIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
