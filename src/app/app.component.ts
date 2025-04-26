import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent ,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loadUser();
  }
}