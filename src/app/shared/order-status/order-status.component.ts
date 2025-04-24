import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-status',
  imports: [CommonModule],
  templateUrl: './order-status.component.html',
  standalone: true,
})
export class OrderStatusComponent {
  @Input() status!: string;

  get statusLabel(): string {
    switch (this.status) {
      case 'CART': return 'Carrinho';
      case 'PENDING': return 'Aguardando Pagamento';
      case 'PAID': return 'Pago';
      case 'PROCESSING': return 'Processando';
      case 'OUT_FOR_DELIVERY': return 'Saiu para Entrega';
      case 'COMPLETED': return 'Concluído';
      default: return this.status;
    }
  }

  get statusClass(): string {
    return this.status.toLowerCase();
  }
}