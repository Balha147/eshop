import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './e-shop/components/product/product-details/product-details.component';
import { ProductFormComponent } from './e-shop/components/product/product-form/product-form.component';

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
    path: 'new-product',
    component: ProductFormComponent
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('./e-shop/components/cart/cart.component').then(c => c.CartComponent)
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
