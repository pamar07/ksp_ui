import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvIndividualComponent } from './tv-individual.component';

describe('TvIndividualComponent', () => {
  let component: TvIndividualComponent;
  let fixture: ComponentFixture<TvIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
