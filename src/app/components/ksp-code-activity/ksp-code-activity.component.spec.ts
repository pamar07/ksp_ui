import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { kspCodeActivityComponent } from './ksp-code-activity.component';

describe('kspCodeActivityComponent', () => {
  let component: kspCodeActivityComponent;
  let fixture: ComponentFixture<kspCodeActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ kspCodeActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(kspCodeActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
