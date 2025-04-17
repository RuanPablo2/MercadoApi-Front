import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  imports: [CommonModule]
})
export class AuthComponent {
  activeTab: 'login' | 'register' = 'login';

  switchTab(tab: 'login' | 'register') {
    this.activeTab = tab;
  }
}