import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductResponse } from '../../dto/response/product-response';
import { CartService } from '../../services/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, RouterModule, MatSnackBarModule],
  providers: [ProductService, CartService]
})
export class HomeComponent implements OnInit {
  products: ProductResponse[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.content;
      },
      error: () => {
        this.snackBar.open('Erro ao carregar produtos', 'Fechar', { duration: 3000, panelClass: ['snackbar-error'] });
      }
    });
  }

  goToProductDetail(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  addToCart(product: ProductResponse): void {
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.sendItem(cart.id, product);
      },
      error: () => {
        this.snackBar.open('Erro ao obter o carrinho', 'Fechar', { duration: 3000, panelClass: ['snackbar-error'] });
      }
    });
  }

  private sendItem(orderId: string, product: ProductResponse): void {
    this.cartService.addItemToCart(orderId, {
      productId: product.id.toString(),
      quantity: 1
    }).subscribe({
      next: () => {
        this.snackBar.open('Produto adicionado ao carrinho!', '', { duration: 2000 });
      },
      error: () => {
        this.snackBar.open('Erro ao adicionar produto ao carrinho', 'Fechar', { duration: 3000, panelClass: ['snackbar-error'] });
      }
    });
  }
}