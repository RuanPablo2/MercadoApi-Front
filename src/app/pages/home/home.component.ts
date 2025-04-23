import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  featuredProducts = [
    { name: 'Arroz Orgânico', price: 15.90, image: 'assets/products/arroz.jpg' },
    { name: 'Feijão Preto', price: 7.50, image: 'assets/products/feijao.jpg' },
    { name: 'Óleo de Girassol', price: 10.00, image: 'assets/products/oleo.jpg' },
    { name: 'Arroz Orgânico', price: 15.90, image: 'assets/products/arroz.jpg' },
    { name: 'Feijão Preto', price: 7.50, image: 'assets/products/feijao.jpg' },
    { name: 'Óleo de Girassol', price: 10.00, image: 'assets/products/oleo.jpg' },
    { name: 'Arroz Orgânico', price: 15.90, image: 'assets/products/arroz.jpg' },
    { name: 'Feijão Preto', price: 7.50, image: 'assets/products/feijao.jpg' }
  ];
}