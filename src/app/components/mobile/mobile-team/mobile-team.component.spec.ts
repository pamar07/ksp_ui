import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileTeamComponent } from './mobile-team.component';

describe('MobileTeamComponent', () => {
  let component: MobileTeamComponent;
  let fixture: ComponentFixture<MobileTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
