import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class CheckoutComponent implements OnInit {
  addressForm!: FormGroup;
  order: any;

  constructor(
    private fb: FormBuilder,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkoutService.getCheckoutInfo().subscribe(data => this.order = data);

    this.addressForm = this.fb.group({
      fullName: [''],
      cep: [''],
      address: [''],
      number: [''],
      paymentMethod: ['CREDIT_CARD']
    });
  }

  submitOrder() {
    const payload = {
      ...this.addressForm.value,
      orderId: this.order.id
    };

    this.checkoutService.completeOrder(payload).subscribe(() => {
      this.router.navigate(['/orders']);
    });
  }
}