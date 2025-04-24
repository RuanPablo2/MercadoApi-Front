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
    { name: 'Arroz Orgânico', price: 15.90, image: 'https://carrefourbrfood.vtexassets.com/arquivos/ids/193571/906417_1.jpg?v=637272430399600000' },
    { name: 'Feijão Preto', price: 7.50, image: 'https://carrefourbrfood.vtexassets.com/arquivos/ids/55790288/feijao-preto-tipo-1-namorado-1kg-1.jpg?v=637892510712800000' },
    { name: 'Óleo de Girassol', price: 10.00, image: 'https://cdn.awsli.com.br/2500x2500/447/447503/produto/144287272/6d3e510dd7.jpg' },
    { name: 'Arroz Orgânico', price: 15.90, image: 'https://carrefourbrfood.vtexassets.com/arquivos/ids/193571/906417_1.jpg?v=637272430399600000' },
    { name: 'Feijão Preto', price: 7.50, image: 'https://carrefourbrfood.vtexassets.com/arquivos/ids/55790288/feijao-preto-tipo-1-namorado-1kg-1.jpg?v=637892510712800000' },
    { name: 'Óleo de Girassol', price: 10.00, image: 'https://cdn.awsli.com.br/2500x2500/447/447503/produto/144287272/6d3e510dd7.jpg' },
    { name: 'Arroz Orgânico', price: 15.90, image: 'https://carrefourbrfood.vtexassets.com/arquivos/ids/193571/906417_1.jpg?v=637272430399600000' },
    { name: 'Feijão Preto', price: 7.50, image: 'https://carrefourbrfood.vtexassets.com/arquivos/ids/55790288/feijao-preto-tipo-1-namorado-1kg-1.jpg?v=637892510712800000' },
    { name: 'Arroz Orgânico', price: 15.90, image: 'https://carrefourbrfood.vtexassets.com/arquivos/ids/193571/906417_1.jpg?v=637272430399600000' },
    { name: 'Feijão Preto', price: 7.50, image: 'https://carrefourbrfood.vtexassets.com/arquivos/ids/55790288/feijao-preto-tipo-1-namorado-1kg-1.jpg?v=637892510712800000' },
    { name: 'Arroz Orgânico', price: 15.90, image: 'https://carrefourbrfood.vtexassets.com/arquivos/ids/193571/906417_1.jpg?v=637272430399600000' },
    { name: 'Feijão Preto', price: 7.50, image: 'https://carrefourbrfood.vtexassets.com/arquivos/ids/55790288/feijao-preto-tipo-1-namorado-1kg-1.jpg?v=637892510712800000' },
    { name: 'Óleo de Girassol', price: 10.00, image: 'https://cdn.awsli.com.br/2500x2500/447/447503/produto/144287272/6d3e510dd7.jpg' },
    { name: 'Arroz Orgânico', price: 15.90, image: 'https://carrefourbrfood.vtexassets.com/arquivos/ids/193571/906417_1.jpg?v=637272430399600000' },
    { name: 'Feijão Preto', price: 7.50, image: 'https://carrefourbrfood.vtexassets.com/arquivos/ids/55790288/feijao-preto-tipo-1-namorado-1kg-1.jpg?v=637892510712800000' },
    { name: 'Óleo de Girassol', price: 10.00, image: 'https://cdn.awsli.com.br/2500x2500/447/447503/produto/144287272/6d3e510dd7.jpg' },
    { name: 'Arroz Orgânico', price: 15.90, image: 'https://carrefourbrfood.vtexassets.com/arquivos/ids/193571/906417_1.jpg?v=637272430399600000' },
    { name: 'Feijão Preto', price: 7.50, image: 'https://carrefourbrfood.vtexassets.com/arquivos/ids/55790288/feijao-preto-tipo-1-namorado-1kg-1.jpg?v=637892510712800000' },
    { name: 'Arroz Orgânico', price: 15.90, image: 'https://carrefourbrfood.vtexassets.com/arquivos/ids/193571/906417_1.jpg?v=637272430399600000' },
    { name: 'Feijão Preto', price: 7.50, image: 'https://carrefourbrfood.vtexassets.com/arquivos/ids/55790288/feijao-preto-tipo-1-namorado-1kg-1.jpg?v=637892510712800000' }
  ];
}