import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KspVoting2019ContentComponent } from './ksp-voting-2019-content.component';

describe('KspVoting2019ContentComponent', () => {
  let component: KspVoting2019ContentComponent;
  let fixture: ComponentFixture<KspVoting2019ContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KspVoting2019ContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KspVoting2019ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
