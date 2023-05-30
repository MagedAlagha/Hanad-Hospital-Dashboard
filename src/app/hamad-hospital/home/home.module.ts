import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonComponentComponent } from 'src/app/shared/Module-shared/button-component/button-component.component';
import { InputFieldComponent } from 'src/app/shared/Module-shared/input-field/input-field.component';
import { IconSharedComponent } from 'src/app/shared/Module-shared/icon-shared/icon-shared.component';
import { TextAreaFieldComponent } from 'src/app/shared/Module-shared/text-area-field/text-area-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckBoxComponent } from 'src/app/shared/Module-shared/check-box/check-box.component';
import { FileUploadModule } from 'primeng/fileupload';
import { UploadFilesComponent } from 'src/app/shared/Module-shared/upload-files/upload-files.component';
import { ServicesCardsComponent } from './services-cards/services-cards.component';
import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';
import { NgxImageCompressService } from 'ngx-image-compress';
import { InputNumberFieldComponent } from 'src/app/shared/Module-shared/input-number-field/input-number-field.component';
import { DragDropModule } from 'primeng/dragdrop';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
    declarations: [HomeComponent, ServicesCardsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomeComponent,
            },
        ]),
        TableModule,
        ButtonComponentComponent,
        InputFieldComponent,
        IconSharedComponent,
        TextAreaFieldComponent,
        ReactiveFormsModule,
        InputSwitchModule,
        CheckBoxComponent,
        FileUploadModule,
        UploadFilesComponent,
        TabViewModule,
        ImageModule,
        InputNumberFieldComponent,
        DragDropModule,
        ColorPickerModule,


    ],
    providers: [NgxImageCompressService],
})
export class HomeModule {}

