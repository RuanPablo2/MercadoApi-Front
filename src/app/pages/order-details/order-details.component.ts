import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrderResponse } from '../../dto/response/order-response';
import { CommonModule } from '@angular/common';
import { OrderStatusComponent } from '../../shared/order-status/order-status.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  standalone: true,
  imports: [CommonModule, OrderStatusComponent]
})
export class OrderDetailsComponent implements OnInit {
  order!: OrderResponse;
  canCancel = false;

  hasItems = false;
  isCart = false;
  isCancelled = false;
  showSummary = false;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')!);
    this.orderService.getOrderById(id).subscribe((data) => {
      this.order = data;

      const status = this.order.status ?? '';
      this.hasItems = !!this.order.items && this.order.items.length > 0;
      this.isCart = status === 'CART';
      this.isCancelled = status === 'CANCELLED';
      this.canCancel = ['PENDING', 'PROCESSING'].includes(status);
      this.showSummary = this.hasItems && !this.isCart && !this.isCancelled;
    });
  }

  trackOrder() {
    // Redireciona para a página de rastreamento, quando tiver
  }

  cancelOrder() {
    this.orderService.cancelOrder(this.order.id).subscribe(() => {
      this.order.status = 'CANCELLED';
      this.isCancelled = true;
      this.canCancel = false;
      this.showSummary = false;
    });
  }
}