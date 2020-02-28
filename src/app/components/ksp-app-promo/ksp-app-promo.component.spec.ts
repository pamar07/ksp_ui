import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { kspAppPromoComponent } from './ksp-app-promo.component';

describe('kspAppPromoComponent', () => {
  let component: kspAppPromoComponent;
  let fixture: ComponentFixture<kspAppPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ kspAppPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(kspAppPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
