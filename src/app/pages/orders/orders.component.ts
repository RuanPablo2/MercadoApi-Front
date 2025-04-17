import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  orders = [
    { id: 12345, total: 259.9, date: '15 Jan 2025', status: 'PENDING' },
    { id: 12344, total: 159.9, date: '14 Jan 2025', status: 'PAID' },
    { id: 12343, total: 459.9, date: '13 Jan 2025', status: 'OUT_FOR_DELIVERY' },
  ];
}