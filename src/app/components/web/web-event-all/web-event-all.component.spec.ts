import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebEventAllComponent } from './web-event-all.component';

describe('WebEventAllComponent', () => {
  let component: WebEventAllComponent;
  let fixture: ComponentFixture<WebEventAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebEventAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebEventAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
