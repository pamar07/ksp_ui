import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundPicComponent } from './round-pic.component';

describe('RoundPicComponent', () => {
  let component: RoundPicComponent;
  let fixture: ComponentFixture<RoundPicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundPicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
