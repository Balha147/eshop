import { DecimalPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EshopService } from '../../../service/e-shop.service';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.scss'],
  standalone: true,
  imports: [NgIf, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartTotalComponent {

  private readonly eshopService = inject(EshopService);


  cartItems = this.eshopService.cartItems;

  subTotal = this.eshopService.subTotal;

  tax = this.eshopService.tax;

  totalPrice = this.eshopService.totalPrice;

  deliveryFree = this.eshopService.deliveryFree;

}
