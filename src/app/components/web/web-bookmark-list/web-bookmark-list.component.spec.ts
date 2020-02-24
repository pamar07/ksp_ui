import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebBookmarkListComponent } from './web-bookmark-list.component';

describe('WebBookmarkListComponent', () => {
  let component: WebBookmarkListComponent;
  let fixture: ComponentFixture<WebBookmarkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebBookmarkListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebBookmarkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
