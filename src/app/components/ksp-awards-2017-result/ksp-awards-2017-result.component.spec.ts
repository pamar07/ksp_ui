import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KspAwards2017ResultComponent } from './ksp-awards-2017-result.component';

describe('KspAwards2017ResultComponent', () => {
  let component: KspAwards2017ResultComponent;
  let fixture: ComponentFixture<KspAwards2017ResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KspAwards2017ResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KspAwards2017ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
