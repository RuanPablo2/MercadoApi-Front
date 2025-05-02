import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { OrderResponse } from '../../dto/response/order-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: OrderResponse[] = [];

  constructor(private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data) => (this.orders = data),
      error: (err) => console.error('Erro ao buscar pedidos', err)
    });
  }

  goToDetails(orderId: number): void {
    this.router.navigate(['/orders', orderId]);
  }
}