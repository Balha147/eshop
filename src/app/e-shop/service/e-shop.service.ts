import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { CartItemsModel, ProductModel } from '../models/e-shop.type';
import {
  Observable,
  catchError,
  filter,
  merge,
  of,
  shareReplay,
  switchMap,
  throwError,
 } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

const BASE_URL = 'https://fakestoreapi.com/products/';


@Injectable({
  providedIn: 'root'
})
export class EshopService {

  private http = inject(HttpClient);

  //* Display list of category
  private categories$ = this.http.get<string[]>(`${BASE_URL}categories`).pipe(
    shareReplay(1),
    catchError(this.handleError)
  );

  categories = toSignal(this.categories$, { initialValue: [] as string[] });

  selectedCategorie = signal<string>('');

  categorieSelected(name: string): void {
    this.selectedCategorie.set(name);
  }

  //* Display all products on first time and filter with categories
  private products$ = merge(
    of(null).pipe(
      switchMap(() => this.http.get<ProductModel[]>(`${BASE_URL}`))
    ),
    toObservable(this.selectedCategorie).pipe(
      filter(Boolean),
      switchMap(categorie => this.http.get<ProductModel[]>(`${BASE_URL}category/${categorie}`))
    )
  ).pipe(
    shareReplay(1)
  );

  //* signal of list products
  products = toSignal<ProductModel[], ProductModel[]>(this.products$, { initialValue: [] });

  //* signal of product details
  selectedProduct = signal<ProductModel | undefined>(undefined);

  //* set signal with product selected details
  productSelected(productId: number): void {
    const foundProduct = this.products().find((poduct: ProductModel) => poduct.id === productId);
    this.selectedProduct.set(foundProduct);
  }

  //* Manage state with signal
  cartItems = signal<CartItemsModel[]>([]);

  //* Total up the extended price for each item
  subTotal = computed(() => this.cartItems().reduce((previous, current) =>
    previous + (current.quantity * Number(current.product.price)), 0));

  //* Tax could be based on shipping address zip code
  tax = computed(() => Math.round(this.subTotal() * 10.75) / 100);

  //* Total price
  totalPrice = computed(() => this.subTotal() + this.tax());

  //* Delivery is free if spending more than 100,000 credits
  deliveryFree = computed(() => this.subTotal() < 500 ? 50 : 0);

  //* Add the product to the cart
  //* If the item is already in the cart, increase the quantity
  addToCart(product: ProductModel): void {
    const index = this.cartItems().findIndex((item: CartItemsModel) =>
      item.product.id === product.id);
    if (index === -1) {
      //* Not already in the cart, so add with default quantity of 1
      this.cartItems.update((items: CartItemsModel[]) => [...items, { product, quantity: 1 }]);
    } else {
      //* Already in the cart, so increase the quantity by 1
      this.cartItems.update((items: CartItemsModel[]) =>
        [
          ...items.slice(0, index),
          { ...items[index], quantity: items[index].quantity + 1 },
          ...items.slice(index + 1)
        ]);
    }
  }

   //* Remove the item from the cart
   removeFromCart(cartItem: CartItemsModel): void {
    //* Update the cart with a new array containing
    //* all but the filtered out deleted item
    this.cartItems.update((items: CartItemsModel[]) => items.filter((item: CartItemsModel) =>
      item.product.id !== cartItem.product.id));
  }

  updateInCart(cartItem: CartItemsModel, quantity: number): void {
    //* Update the cart with a new array containing
    //* the updated item and all other original items
    this.cartItems.update((items: CartItemsModel[]) =>
      items.map((item:CartItemsModel) =>
        item.product.id === cartItem.product.id ?
    { product: cartItem.product, quantity } :
    item));
  }

  //* Error Management
  private handleError(err: HttpErrorResponse): Observable<never> {
    //* in a real world app, we may send the server to some remote logging infrastructure
    //* instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      //* A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      //* The backend returned an unsuccessful response code.
      //* The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message
        }`;
    }
    return throwError(() => errorMessage);
  }
}
