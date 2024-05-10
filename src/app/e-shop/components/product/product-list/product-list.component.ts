import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { EshopService } from '../../../service/e-shop.service';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductModel } from '../../../models/e-shop.type';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, ProductItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  private readonly eshopService = inject(EshopService);

  errorMessage = '';

  filterCriteria = input.required({
    transform: (value: string) => value.toLocaleLowerCase(),
    alias: 'filterList'
   });

  products = computed(() => {
    try {
      return this.eshopService.products().filter((product: ProductModel) =>
        product.title.toLocaleLowerCase().includes(this.filterCriteria())
      );;
    } catch (error) {
      this.errorMessage = typeof error === 'string'? error : 'Error';
        return [];
    }
  });
}
