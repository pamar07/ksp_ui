import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebContributorComponent } from './web-contributor.component';

describe('WebContributorComponent', () => {
  let component: WebContributorComponent;
  let fixture: ComponentFixture<WebContributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebContributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebContributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
