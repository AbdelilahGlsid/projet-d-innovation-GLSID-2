import { CanActivateFn } from '@angular/router';

export const authorisationGuard: CanActivateFn = (route, state) => {
  return true;
};
