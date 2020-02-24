import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPublicComponent } from './product-public.component';

describe('ProductPublicComponent', () => {
  let component: ProductPublicComponent;
  let fixture: ComponentFixture<ProductPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
