import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebTvIndividualComponent } from './web-tv-individual.component';

describe('WebTvIndividualComponent', () => {
  let component: WebTvIndividualComponent;
  let fixture: ComponentFixture<WebTvIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebTvIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebTvIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
