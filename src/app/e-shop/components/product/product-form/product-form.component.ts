import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators as v } from '@angular/forms';
import { EshopService } from '../../../service/e-shop.service';
import { customErrorMessage, ProductFormType } from './product-form.type';
import { JsonPipe } from '@angular/common';
import { ShowFormErrorComponent } from '../../../../shared/show-form-error/show-form-error.component';
import { urlValidator } from '../../../../shared/validators/url.validator';
import { ProductModel } from '../../../models/e-shop.type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, ShowFormErrorComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  private readonly eshopService = inject(EshopService);

  errorMessage = '';

  errorFormMessage = customErrorMessage;

  categories = computed(() => {
    try {
      return this.eshopService.categories();
    } catch (error) {
      this.errorMessage = typeof error === 'string'? error : 'Error';
        return [];
    }
  });

  form = new FormGroup<ProductFormType>({
    category: new FormControl<string>('', { validators:[v.required], nonNullable: true }),
    name: new FormControl<string>('', { validators:[v.required], nonNullable: true }),
    price: new FormControl<number>(0 , { validators:[v.required], nonNullable: true }),
    imageUrl: new FormControl<string>('', { validators:[v.required, urlValidator], nonNullable: true }),
  })

  sendForm(): void {
    if (this.form.invalid) {
      return;
    }
    const bodyRequest = this.form.value as ProductModel;
    this.eshopService.addNewProduct(bodyRequest).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Your product has been successfully added",
          showConfirmButton: true,
        });
      },
      error: () => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Thenic error, please try again later!",
        });
      }
    })
  }
}
