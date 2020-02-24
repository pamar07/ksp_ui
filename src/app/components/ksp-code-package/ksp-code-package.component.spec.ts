import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KspCodePackageComponent } from './ksp-code-package.component';

describe('KspCodePackageComponent', () => {
  let component: KspCodePackageComponent;
  let fixture: ComponentFixture<KspCodePackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KspCodePackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KspCodePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
