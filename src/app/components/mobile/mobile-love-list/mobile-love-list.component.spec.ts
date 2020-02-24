import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileLoveListComponent } from './mobile-love-list.component';

describe('MobileLoveListComponent', () => {
  let component: MobileLoveListComponent;
  let fixture: ComponentFixture<MobileLoveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileLoveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileLoveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
