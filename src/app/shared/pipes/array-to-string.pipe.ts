import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'array-to-string',
})
export class ArrayToStringPipe implements PipeTransform {
    transform(data: any[], args: string = ','): any {
        return data.join(args);
    }
}
