import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'isImage',
})
export class IsImagePipe implements PipeTransform {
    arrTypes: any = [
        'apng',
        'avif',
        'gif',
        'jpg',
        'jpeg',
        'jfif',
        'pjpeg',
        'pjp',
        'png',
        'svg',
        'webp',
    ];
    transform(value: string): boolean {
        let isImage = this.arrTypes.includes(value?.split('.')[1]) ? true : false;
        console.log('isImage',isImage)
        return isImage;
    }
}
