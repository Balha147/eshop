import { FormControl } from "@angular/forms";
import { StringFunctionMap } from "../../../../shared/show-form-error/show-form-error.type";

export interface ProductFormType {
  category: FormControl<string>;
  name: FormControl<string>;
  price: FormControl<number>;
  imageUrl: FormControl<string>;
}

export const customErrorMessage: StringFunctionMap = {
  invalidUrl: () => 'Ce champ doit contenir un lien',
}
