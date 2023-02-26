import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'string-to-array',
})
export class StringToArrayPipe implements PipeTransform {
    transform(data: string, args: string = ','): any {
        return data.split(args);
    }
}
