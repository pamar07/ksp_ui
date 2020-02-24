import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StayTunedAwards2018ContentComponent } from './stay-tuned-awards2018-content.component';

describe('StayTunedAwards2018ContentComponent', () => {
  let component: StayTunedAwards2018ContentComponent;
  let fixture: ComponentFixture<StayTunedAwards2018ContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StayTunedAwards2018ContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StayTunedAwards2018ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
