import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartResponse, CartItem } from 'src/app/dto/response/cart-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart!: CartResponse;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(data => this.cart = data);
  }

  increaseQty(item: CartItem) {
    this.cartService.updateItemQuantity(item.product.id, item.quantity + 1)
      .subscribe(data => this.cart = data);
  }

  decreaseQty(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateItemQuantity(item.product.id, item.quantity - 1)
        .subscribe(data => this.cart = data);
    }
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item.product.id)
      .subscribe(data => this.cart = data);
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}