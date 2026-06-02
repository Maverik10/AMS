import { CanActivateFn } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {

    const isLoggedIn =
      localStorage.getItem('loggedIn') === 'true';

    if (isLoggedIn) {
      return true;
    }
  }

  router.navigate(['/']);
  return false;
};