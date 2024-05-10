import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { EshopService } from '../../service/e-shop.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategorieListComponent {

private readonly eshopService = inject(EshopService);

errorMessage = '';

categories = computed(() => {
  try {
    return this.eshopService.categories();
  } catch (error) {
    this.errorMessage = typeof error === 'string'? error : 'Error';
      return [];
  }
});

selectedCategorie = this.eshopService.selectedCategorie;

productsByCategorie = computed(() => {
  try {
    return this.eshopService.products()
  } catch (error) {
    this.errorMessage = typeof error === 'string'? error : 'Error';
    return [];
  }
})

  //* When a categorie is selected, emit the selected categorie name
  onSelected(categorieName: string): void {
    this.eshopService.categorieSelected(categorieName);
  }
}
