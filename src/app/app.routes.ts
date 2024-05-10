import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './e-shop/components/product/product-details/product-details.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./e-shop/components/home/home.component')
    .then(c => c.HomeComponent)
  },

  {
    path: 'product/:id',
    component: ProductDetailsComponent
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('./e-shop/components/cart/cart.component').then(c => c.CartComponent)
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
