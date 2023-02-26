import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'total',
    standalone: true,
})
export class TotalPipe implements PipeTransform {
    transform(data: any[], args: string): any {
        var total = 0;
        data.forEach((value) => {
            total = total + +value[args];
        });
        return total;
    }
}
