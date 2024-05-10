import { ChangeDetectionStrategy, Component} from '@angular/core';
import { NgIf } from '@angular/common';
import { CartListComponent } from './cart-list/cart-list.component';
import { CartTotalComponent } from './cart-total/cart-total.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [NgIf, CartListComponent, CartTotalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {


}
