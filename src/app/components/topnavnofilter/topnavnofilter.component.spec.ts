import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopnavnofilterComponent } from './topnavnofilter.component';

describe('TopnavnofilterComponent', () => {
  let component: TopnavnofilterComponent;
  let fixture: ComponentFixture<TopnavnofilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopnavnofilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopnavnofilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
