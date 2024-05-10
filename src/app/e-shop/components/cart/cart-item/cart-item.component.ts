import { ChangeDetectionStrategy, Component, Input, inject, signal } from '@angular/core';
import { CartItemsModel } from '../../../models/e-shop.type';
import { EshopService } from '../../../service/e-shop.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QUANTITY_PRODUCT } from '../../../config/quantity.config';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent {

  private readonly eshopService = inject(EshopService);

  //* Use a setter to emit whenever a new item is set
_item!: CartItemsModel;

get item(): CartItemsModel {
  return this._item;
}

@Input() set item(item: CartItemsModel) {
  this._item = item;
  this.cartItem.set(item);
}

//* Cart item signal
cartItem = signal(this.item);

qtyArr = signal(QUANTITY_PRODUCT);

onQuantitySelected(quantity: number): void {
  // Update the quantity in the item
  this.eshopService.updateInCart(this.cartItem(), Number(quantity));
}

onRemove(): void {
  this.eshopService.removeFromCart(this.cartItem());
}
}
