import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileContributorComponent } from './mobile-contributor.component';

describe('MobileContributorComponent', () => {
  let component: MobileContributorComponent;
  let fixture: ComponentFixture<MobileContributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileContributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileContributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
