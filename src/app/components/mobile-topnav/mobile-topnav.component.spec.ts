import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileTopnavComponent } from './mobile-topnav.component';

describe('MobileTopnavComponent', () => {
  let component: MobileTopnavComponent;
  let fixture: ComponentFixture<MobileTopnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileTopnavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileTopnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
