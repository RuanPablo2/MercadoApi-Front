import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class AuthComponent {
  activeTab: 'login' | 'register' = 'login';

  switchTab(tab: 'login' | 'register') {
    this.activeTab = tab;
  }
}