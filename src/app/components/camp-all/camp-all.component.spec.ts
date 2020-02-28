import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampAllComponent } from './camp-all.component';

describe('CampAllComponent', () => {
  let component: CampAllComponent;
  let fixture: ComponentFixture<CampAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
