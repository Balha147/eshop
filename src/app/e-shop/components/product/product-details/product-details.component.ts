import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EshopService } from '../../../service/e-shop.service';
import { ProductModel } from '../../../models/e-shop.type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent {
  private readonly eshopService = inject(EshopService);

  productDetails = this.eshopService.selectedProduct;

  addToCart(product: ProductModel | undefined): void {
    if (product) {
      this.eshopService.addToCart(product);
    }
  }

}
