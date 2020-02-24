import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebMagazineComponent } from './web-magazine.component';

describe('WebMagazineComponent', () => {
  let component: WebMagazineComponent;
  let fixture: ComponentFixture<WebMagazineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebMagazineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebMagazineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
