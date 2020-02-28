import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePostIndividualComponent } from './mobile-post-individual.component';

describe('MobilePostIndividualComponent', () => {
  let component: MobilePostIndividualComponent;
  let fixture: ComponentFixture<MobilePostIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilePostIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilePostIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
