import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCustomResultComponent } from './web-custom-result.component';

describe('WebCustomResultComponent', () => {
  let component: WebCustomResultComponent;
  let fixture: ComponentFixture<WebCustomResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebCustomResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebCustomResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
