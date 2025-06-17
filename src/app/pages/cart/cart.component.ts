import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartResponse, CartItem } from '../../dto/response/cart-response';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CartComponent implements OnInit {
  cart: CartResponse | null = null;
  isLoading = true;
  private subscriptions = new Subscription();

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.isLoading = true;
    this.subscriptions.add(
      this.cartService.getCart().subscribe({
        next: (data: CartResponse) => {
          this.cart = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Erro ao carregar carrinho:", err);
          this.cart = null;
          this.isLoading = false;
        }
      })
    );
  }

  increaseQty(item: CartItem): void {
    if (!this.cart) return;

    this.cartService.addItemToCart(this.cart.id, {
      productId: item.productId,
      quantity: 1
    }).subscribe((data: CartResponse) => {
      this.cart = data;
    });
  }

  decreaseQty(item: CartItem): void {
    if (!this.cart || item.quantity <= 1) return;

    this.cartService.decreaseItemQuantity(this.cart.id, item.productId, 1)
      .subscribe((data: CartResponse) => {
        this.cart = data;
      });
  }

  removeItem(item: CartItem): void {
    if (!this.cart) return;

    this.cartService.removeItem(this.cart.id, item.productId)
      .subscribe((data: CartResponse) => {
        this.cart = data;
      });
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}