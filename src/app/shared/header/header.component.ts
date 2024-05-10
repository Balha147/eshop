import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EshopService } from '../../e-shop/service/e-shop.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class HeaderComponent  {
  private readonly eshopService = inject(EshopService);
  cartCount = computed(() => this.eshopService.cartItems().reduce(
    (acc, item) => acc + item.quantity, 0));
}
