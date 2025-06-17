import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const AuthGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  console.log('%cAuthGuard: Executando...', 'color: blue; font-weight: bold;');

  return authService.currentUser$.pipe(
    take(1),
    map(user => {
      console.log('%cAuthGuard: Usuário recebido do AuthService:', 'color: blue;', user);

      if (user) {
        console.log('%cAuthGuard: Decisão -> PERMITIR acesso (true)', 'color: green; font-weight: bold;');
        return true;
      }

      console.log('%cAuthGuard: Decisão -> BLOQUEAR acesso e redirecionar para /auth', 'color: red; font-weight: bold;');
      
      snackBar.open('Você precisa estar logado para acessar esta página.', 'Fechar', {
        duration: 3000,
        verticalPosition: 'top'
      });
      
      return router.createUrlTree(['/auth']);
    })
  );
};
