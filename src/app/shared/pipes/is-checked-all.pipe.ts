import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'isCheckedAll',
    standalone: true,
})
export class IsCheckedAllPipe implements PipeTransform {
    transform(data: any[], arg: string): unknown {
        return data.find((value: any) => value[arg] == false) ? false : true;
    }
}
