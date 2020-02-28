import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSearchResultComponent } from './mobile-search-result.component';

describe('MobileSearchResultComponent', () => {
  let component: MobileSearchResultComponent;
  let fixture: ComponentFixture<MobileSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
