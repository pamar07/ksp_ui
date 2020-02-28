import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebTeamComponent } from './web-team.component';

describe('WebTeamComponent', () => {
  let component: WebTeamComponent;
  let fixture: ComponentFixture<WebTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
