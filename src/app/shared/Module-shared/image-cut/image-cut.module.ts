import { ImageCropperModule } from 'ngx-image-cropper';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCutComponent } from './image-cut.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponentComponent } from '../button-component/button-component.component';
import { DialogSharedComponent } from '../dialog-shared/dialog-shared.component';

@NgModule({
    declarations: [ImageCutComponent],
    imports: [
        CommonModule,
        ImageCropperModule,
        TranslateModule,
        ButtonComponentComponent,
        DialogSharedComponent,
    ],
    exports: [ImageCutComponent],
})
export class ImageCutModule {}
