import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileTvAllComponent } from './mobile-tv-all.component';

describe('MobileTvAllComponent', () => {
  let component: MobileTvAllComponent;
  let fixture: ComponentFixture<MobileTvAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileTvAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileTvAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
