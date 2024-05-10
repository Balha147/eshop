import { ChangeDetectionStrategy, Component, Input, inject, signal } from '@angular/core';
import { ProductModel } from '../../../models/e-shop.type';
import { NgIf } from '@angular/common';
import { EshopService } from '../../../service/e-shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent {
  private readonly eshopService = inject(EshopService);

  private readonly router = inject(Router);

  //* Use a setter to emit whenever a new item is set
  _item!: ProductModel;

  get item(): ProductModel {
    return this._item;
  }

  @Input() set item(item: ProductModel) {
    this._item = item;
    this.productItem.set(item);
  }

  //* Product item signal
productItem = signal(this.item);

addToCart(product: ProductModel | undefined): void {
  if (product) {
    this.eshopService.addToCart(product);
  }
}

navigateToProductDetails(id: number): void {
  this.eshopService.productSelected(id);
  this.router.navigate(['/product', id]);
}
}
