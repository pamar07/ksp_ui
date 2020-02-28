import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLoveComponent } from './group-love.component';

describe('GroupLoveComponent', () => {
  let component: GroupLoveComponent;
  let fixture: ComponentFixture<GroupLoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupLoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
