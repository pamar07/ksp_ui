import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KspAwardsComponent } from './ksp-awards.component';

describe('KspAwardsComponent', () => {
  let component: KspAwardsComponent;
  let fixture: ComponentFixture<KspAwardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KspAwardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KspAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
