import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductResponse } from '../../dto/response/product-response';
import { CartService } from '../../services/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AuthenticatedUserDTO } from '../../dto/response/authenticated-user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, RouterModule, MatSnackBarModule],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: ProductResponse[] = [];
  currentUser: AuthenticatedUserDTO | null = null;
  private subscriptions = new Subscription();

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.productService.getAllProducts().subscribe({
        next: (response) => {
          this.products = response.content;
        },
        error: () => {
          this.snackBar.open('Erro ao carregar produtos', 'Fechar', { duration: 3000 });
        }
      })
    );

    this.subscriptions.add(
      this.authService.currentUser$.subscribe(user => {
        this.currentUser = user;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  goToProductDetail(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  addToCart(product: ProductResponse): void {
    if (!this.currentUser) {
      const snackBarRef = this.snackBar.open('Você precisa estar logado para fazer isso.', 'LOGIN', {
        duration: 5000,
        verticalPosition: 'top'
      });
      snackBarRef.onAction().subscribe(() => {
        this.router.navigate(['/auth']);
      });
      return;
    }

    this.subscriptions.add(
      this.cartService.getCart().subscribe({
        next: (cart) => {
          this.sendItem(cart.id, product);
        },
        error: () => {
          this.snackBar.open('Erro ao obter o carrinho', 'Fechar', { duration: 3000 });
        }
      })
    );
  }

  private sendItem(orderId: number, product: ProductResponse): void {
    this.subscriptions.add(
      this.cartService.addItemToCart(orderId, {
        productId: product.id,
        quantity: 1
      }).subscribe({
        next: () => {
          this.snackBar.open('Produto adicionado ao carrinho!', '', { duration: 2000, verticalPosition: 'top' });
        },
        error: () => {
          this.snackBar.open('Erro ao adicionar produto ao carrinho', 'Fechar', { duration: 3000 });
        }
      })
    );
  }
}
