import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CategorieListComponent } from '../categorie-list/categorie-list.component';
import { ProductListComponent } from '../product/product-list/product-list.component';
import { SearchComponent } from '../../../shared/search/search.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CategorieListComponent, ProductListComponent, SearchComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  listFiltred = signal('');

  filterlength = computed(() => this.listFiltred().length);

}
