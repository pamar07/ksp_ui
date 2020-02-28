import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KspVoting2019PopupComponent } from './ksp-voting-2019-popup.component';

describe('KspVoting2019PopupComponent', () => {
  let component: KspVoting2019PopupComponent;
  let fixture: ComponentFixture<KspVoting2019PopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KspVoting2019PopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KspVoting2019PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
