import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isAuthenticated = false;
  isAdmin = false;
  showSimpleHeader = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.isAdmin = user?.role === 'ADMIN';
    });

    // escuta mudanças de rota
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showSimpleHeader = this.checkIfSimpleHeader(event.urlAfterRedirects);
    });

    // inicial
    this.showSimpleHeader = this.checkIfSimpleHeader(this.router.url);
  }

  checkIfSimpleHeader(url: string): boolean {
    return ['/login', '/register', '/forgot-password', '/auth'].some(route => url.includes(route));
  }

  logout() {
    this.authService.logout();
  }
}