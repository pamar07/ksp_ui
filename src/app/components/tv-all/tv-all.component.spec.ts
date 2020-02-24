import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvAllComponent } from './tv-all.component';

describe('TvAllComponent', () => {
  let component: TvAllComponent;
  let fixture: ComponentFixture<TvAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
