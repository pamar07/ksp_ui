import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedImageComponent } from './saved-images.component';

describe('SavedImageComponent', () => {
  let component: SavedImageComponent;
  let fixture: ComponentFixture<SavedImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
