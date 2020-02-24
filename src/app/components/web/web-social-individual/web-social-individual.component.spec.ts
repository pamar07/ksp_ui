import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSocialIndividualComponent } from './web-social-individual.component';

describe('WebSocialIndividualComponent', () => {
  let component: WebSocialIndividualComponent;
  let fixture: ComponentFixture<WebSocialIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebSocialIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebSocialIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
