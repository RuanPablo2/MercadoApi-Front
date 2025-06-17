import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticatedUserDTO } from '../dto/response/authenticated-user';

export const AdminGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  return authService.currentUser$.pipe(
    take(1),
    map((user: AuthenticatedUserDTO | null) => {
      if (user && user.role === 'ROLE_ADMIN') {
        return true;
      }

      snackBar.open('Access denied. This area is restricted to administrators.', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      
      return router.createUrlTree([user ? '/' : '/auth']);
    })
  );
};