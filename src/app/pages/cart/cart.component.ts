import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartResponse, CartItem } from '../../dto/response/cart-response';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CartComponent implements OnInit {
  cart!: CartResponse;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe((data: CartResponse) => {
      this.cart = data;
    });
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
}