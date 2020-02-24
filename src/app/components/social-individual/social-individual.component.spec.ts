import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialIndividualComponent } from './social-individual.component';

describe('SocialIndividualComponent', () => {
  let component: SocialIndividualComponent;
  let fixture: ComponentFixture<SocialIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
