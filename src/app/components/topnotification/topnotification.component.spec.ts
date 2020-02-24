import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopnotificationComponent } from './topnotification.component';

describe('TopnotificationComponent', () => {
  let component: TopnotificationComponent;
  let fixture: ComponentFixture<TopnotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopnotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
