import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSocialIndividualComponent } from './mobile-social-individual.component';

describe('MobileSocialIndividualComponent', () => {
  let component: MobileSocialIndividualComponent;
  let fixture: ComponentFixture<MobileSocialIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSocialIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSocialIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
