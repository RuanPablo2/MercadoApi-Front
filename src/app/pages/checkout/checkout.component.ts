import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule]
})
export class CheckoutComponent implements OnInit {
  addressForm!: FormGroup;
  order: any;

  private fb = inject(FormBuilder);
  private checkoutService = inject(CheckoutService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.checkoutService.getCheckoutInfo().subscribe(data => this.order = data);

    this.addressForm = this.fb.group({
      shippingAddress: this.fb.group({
        fullName: ['', Validators.required],
        cep: ['', Validators.required],
        street: ['', Validators.required],
        number: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        neighborhood: ['', Validators.required],
        complement: ['']
      }),
      paymentMethod: ['CREDIT_CARD', Validators.required]
    });
  }

  submitOrder() {
    if (!this.order || this.addressForm.invalid) return;
  
    const payload = {
      ...this.addressForm.value,
      orderId: this.order.id
    };
  
    this.checkoutService.completeOrder(payload).subscribe({
        next: () => {
            this.snackBar.open('Pedido finalizado com sucesso! Redirecionando...', 'Fechar', { 
                duration: 3000 
            });
            setTimeout(() => this.router.navigate(['/my-orders']), 2000);
        },
        error: (err) => {
            const errorMsg = err?.error?.message || 'Ocorreu um erro ao finalizar o pedido.';
            this.snackBar.open(errorMsg, 'Fechar', {
                duration: 5000,
                panelClass: ['snackbar-error']
            });
        }
    });
  }
}