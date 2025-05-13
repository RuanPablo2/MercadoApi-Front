import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  quantity = 1;
  orderId!: number;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  const productId = +this.route.snapshot.paramMap.get('id')!;
  if (productId) {
    this.productService.getProductById(productId).subscribe(data => {
      this.product = data;
    });
  }

  this.cartService.getCart().subscribe(cart => {
    this.orderId = cart.id;
  });
}

  increaseQuantity() {
  this.quantity++;
}


  decreaseQuantity() {
  if (this.quantity > 1) {
    this.quantity--;
  }
}

  addToCart(): void {
  if (!this.orderId || !this.product) return;

  const item = {
    productId: this.product.id,
    quantity: this.quantity
  };

  this.cartService.addItemToCart(this.orderId, item).subscribe({
    next: () => {
      this.snackBar.open('Produto adicionado ao carrinho!', '', { duration: 2000 });
    },
    error: (err) => {
      const msg = err?.error?.message || 'Erro ao adicionar produto ao carrinho';
      this.snackBar.open(msg, 'Fechar', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    }
  });
}
}