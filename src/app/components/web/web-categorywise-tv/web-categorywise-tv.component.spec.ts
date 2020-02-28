import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCategorywiseTvComponent } from './web-categorywise-tv.component';

describe('WebCategorywiseTvComponent', () => {
  let component: WebCategorywiseTvComponent;
  let fixture: ComponentFixture<WebCategorywiseTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebCategorywiseTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebCategorywiseTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
