import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, input } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';
import { StringFunctionMap } from './show-form-error.type';

@Component({
  selector: 'app-show-form-error',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './show-form-error.component.html',
  styleUrl: './show-form-error.component.scss'
})
export class ShowFormErrorComponent {
  private static readonly defaultErrorMessage: StringFunctionMap = {
    required: () => 'Ce champ est obligatoire',
  }

  customErrorMessage = input<StringFunctionMap>();

  icon=input<string>();

  control = input<AbstractControl | AbstractControlDirective | null>();

  private getMesage(type: string, params?: any): string {
    const getErrorMessage = (
      messages: StringFunctionMap,
      typeMessage: string,
      paramsMessage?: any
    ): string => {
      const errorMessage = messages[typeMessage];
      return typeof errorMessage === 'function' ? errorMessage(paramsMessage) : 'Erreur inconnue';
    };

    const customMessages = this.customErrorMessage();
    if (customMessages && type in customMessages) {
      return getErrorMessage(customMessages, type, params);
    } else if(type in ShowFormErrorComponent.defaultErrorMessage) {
      return getErrorMessage(ShowFormErrorComponent.defaultErrorMessage, type, params);
    }

    return 'Erreur inconnue';
  }

  shouldShowErrors(): boolean | null | undefined {
    return this.control() && this.control()?.errors && (this.control()?.dirty || this.control()?.touched);
  }

  listOfErrors(): string[] {
    const errors = this.control()?.errors;
    if (!errors) {
      return [];
    }
    return Object.keys(errors).map((field: string) =>
      this.getMesage(field, this.control()?.errors?.[field])
    );
  }
}
