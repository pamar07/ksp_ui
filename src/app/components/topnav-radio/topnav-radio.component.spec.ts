import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopnavRadioComponent } from './topnav-radio.component';

describe('TopnavRadioComponent', () => {
  let component: TopnavRadioComponent;
  let fixture: ComponentFixture<TopnavRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopnavRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopnavRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
