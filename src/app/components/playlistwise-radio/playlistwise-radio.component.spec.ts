import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistwiseRadioComponent } from './playlistwise-radio.component';

describe('PlaylistwiseRadioComponent', () => {
  let component: PlaylistwiseRadioComponent;
  let fixture: ComponentFixture<PlaylistwiseRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistwiseRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistwiseRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
