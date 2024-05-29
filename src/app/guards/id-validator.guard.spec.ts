import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { idValidatorGuard } from './id-validator.guard';

describe('idValidatorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => idValidatorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
