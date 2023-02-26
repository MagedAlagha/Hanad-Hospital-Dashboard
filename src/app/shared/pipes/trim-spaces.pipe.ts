import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'trimSpaces',
})
export class TrimSpacesPipe implements PipeTransform {
    transform(value: string): any {
        return value.replace(/ /g, '');
    }
}
