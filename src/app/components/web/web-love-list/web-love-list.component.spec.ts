import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebLoveListComponent } from './web-love-list.component';

describe('WebLoveListComponent', () => {
  let component: WebLoveListComponent;
  let fixture: ComponentFixture<WebLoveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebLoveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebLoveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
