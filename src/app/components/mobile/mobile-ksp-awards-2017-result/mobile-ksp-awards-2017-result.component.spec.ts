import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileKspAwards2017ResultComponent } from './mobile-ksp-awards-2017-result.component';

describe('MobileKspAwards2017ResultComponent', () => {
  let component: MobileKspAwards2017ResultComponent;
  let fixture: ComponentFixture<MobileKspAwards2017ResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileKspAwards2017ResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileKspAwards2017ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
