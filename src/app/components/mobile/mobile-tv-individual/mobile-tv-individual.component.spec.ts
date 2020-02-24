import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileTvIndividualComponent } from './mobile-tv-individual.component';

describe('MobileTvIndividualComponent', () => {
  let component: MobileTvIndividualComponent;
  let fixture: ComponentFixture<MobileTvIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileTvIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileTvIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
