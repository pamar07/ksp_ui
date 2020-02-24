import { TestBed, async, inject } from '@angular/core/testing';

import { BrandAuthGuard } from './brand-auth.guard';

describe('BrandAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrandAuthGuard]
    });
  });

  it('should ...', inject([BrandAuthGuard], (guard: BrandAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
