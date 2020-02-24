import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSearchResultComponent } from './web-search-result.component';

describe('WebSearchResultComponent', () => {
  let component: WebSearchResultComponent;
  let fixture: ComponentFixture<WebSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
