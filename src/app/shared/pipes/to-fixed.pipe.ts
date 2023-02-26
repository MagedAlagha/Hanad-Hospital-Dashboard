import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,

    name: 'toFixed',
})
export class ToFixedPipe implements PipeTransform {
    transform(value: number, args: number) {
        if (typeof value == 'string') {
            return (+value).toFixed(args);
        } else {
            return value.toFixed(args);
        }
    }
}
