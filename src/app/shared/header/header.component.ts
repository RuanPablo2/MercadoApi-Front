import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

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

  constructor(private router: Router) {
    this.updateAuthStatus();

    // só escuta quando a navegação termina
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showSimpleHeader = this.checkIfSimpleHeader(event.urlAfterRedirects);
    });

    // também verifica na carga inicial
    this.showSimpleHeader = this.checkIfSimpleHeader(this.router.url);
  }

  updateAuthStatus() {
    this.isAuthenticated = !!localStorage.getItem('token');
    this.isAdmin = localStorage.getItem('role') === 'ADMIN';
  }

  checkIfSimpleHeader(url: string): boolean {
    return ['/login', '/register', '/forgot-password', '/auth'].some(route => url.includes(route));
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}