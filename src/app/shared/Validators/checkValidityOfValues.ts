import { AbstractControl } from '@angular/forms';

export function CheckValidityOfValues(control: AbstractControl) {
    const firstValue = control.get('MinAge');
    const secondValue = control.get('MaxAge');
    return firstValue?.value > secondValue?.value
        ? { SholdBigger: true }
        : null;
}
