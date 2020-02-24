import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsResultsComponent } from './awards-result.component';

describe('StayTunedAwards2018ContentComponent', () => {
  let component: AwardsResultsComponent;
  let fixture: ComponentFixture<AwardsResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwardsResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
