import { CanActivateFn, Router } from '@angular/router';
import { inject, ɵɵinject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let _route = inject(Router);
  const authService = ɵɵinject(AuthService);
  if (!authService.isLoggedIn()) {
    _route.navigate(['enter-key'], { queryParams: { redirectUrl: state.url } });
    return false;
  } else {
    return true;
  }
}

export const signedInGuard: CanActivateFn = (route, state) => {
  let _route = inject(Router);
  const authService = ɵɵinject(AuthService);
  if (authService.isLoggedIn()) {
    _route.navigate([''], { queryParams: { redirectUrl: state.url } });
    return false;
  } else {
    return true;
  }
}

