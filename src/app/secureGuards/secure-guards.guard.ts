import { CanActivateFn } from '@angular/router';

export const secureGuardsGuard: CanActivateFn = (route, state) => {
  return true;
};
