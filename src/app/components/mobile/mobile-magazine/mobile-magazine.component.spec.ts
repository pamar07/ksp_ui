import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMagazineComponent } from './mobile-magazine.component';

describe('MobileMagazineComponent', () => {
  let component: MobileMagazineComponent;
  let fixture: ComponentFixture<MobileMagazineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileMagazineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileMagazineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
