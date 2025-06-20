import { Routes } from '@angular/router';

// Guards
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

// Páginas públicas
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

// Páginas protegidas (usuário autenticado)
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

// Admin
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { ProductsCreateComponent } from './pages/admin/products-create/products-create.component';
import { ProductsEditComponent } from './pages/admin/products-edit/products-edit.component';
import { AdminOrdersComponent } from './pages/admin/orders/orders.component';
import { AdminOrderDetailsComponent } from './pages/admin/order-details/order-details.component';

export const routes: Routes = [
  // Rotas Públicas
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'login', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'register', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'product/:id', component: ProductDetailsComponent },

  // Rotas do Cliente (requerem autenticação)
  { path: 'my-orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'my-orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },

  // Rotas de Administração (requerem autenticação e permissão de admin)
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/create', component: ProductsCreateComponent },
      { path: 'products/edit/:id', component: ProductsEditComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'orders/:id', component: AdminOrderDetailsComponent },
    ]
  },

  { path: '**', redirectTo: '' }
];