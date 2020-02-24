import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileCampAllComponent } from './mobile-camp-all.component';

describe('MobileCampAllComponent', () => {
  let component: MobileCampAllComponent;
  let fixture: ComponentFixture<MobileCampAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileCampAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileCampAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
