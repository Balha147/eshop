import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EshopService } from '../../../service/e-shop.service';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { NgFor, NgIf } from '@angular/common';
import { DataNotFoundComponent } from '../../../../shared/data-not-found/data-not-found.component';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  standalone: true,
  imports: [CartItemComponent, NgFor, NgIf, DataNotFoundComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartListComponent {
  private readonly eshopService = inject(EshopService);

  cartItems = this.eshopService.cartItems;

}
