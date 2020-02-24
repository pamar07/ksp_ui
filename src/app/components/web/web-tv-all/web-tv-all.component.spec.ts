import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebTvAllComponent } from './web-tv-all.component';

describe('WebTvAllComponent', () => {
  let component: WebTvAllComponent;
  let fixture: ComponentFixture<WebTvAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebTvAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebTvAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
