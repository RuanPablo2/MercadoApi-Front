import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { OrderResponse } from 'src/app/dto/response/order-response';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order!: OrderResponse;
  canCancel = false;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.orderService.getOrderById(id).subscribe((data) => {
      this.order = data;
      this.canCancel = ['CART', 'PENDING', 'PROCESSING'].includes(this.order.status);
    });
  }

  trackOrder() {
    // Redireciona para a página de rastreamento, quando tiver
  }

  cancelOrder() {
    this.orderService.cancelOrder(this.order.id).subscribe(() => {
      this.order.status = 'CANCELLED';
      this.canCancel = false;
    });
  }
}