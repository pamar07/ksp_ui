import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoveListComponent } from './love-list.component';

describe('LoveListComponent', () => {
  let component: LoveListComponent;
  let fixture: ComponentFixture<LoveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
