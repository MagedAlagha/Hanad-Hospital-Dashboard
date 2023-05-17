import { MultiSelectFieldComponent } from './../../shared/Module-shared/multi-select-field/multi-select-field.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaCenterComponent } from './media-center.component';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonComponentComponent } from 'src/app/shared/Module-shared/button-component/button-component.component';
import { InputFieldComponent } from 'src/app/shared/Module-shared/input-field/input-field.component';
import { IconSharedComponent } from 'src/app/shared/Module-shared/icon-shared/icon-shared.component';
import { TextAreaFieldComponent } from 'src/app/shared/Module-shared/text-area-field/text-area-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckBoxComponent } from 'src/app/shared/Module-shared/check-box/check-box.component';
import { FileUploadModule } from 'primeng/fileupload';
import { UploadFilesComponent } from 'src/app/shared/Module-shared/upload-files/upload-files.component';
import { SelectFieldComponent } from 'src/app/shared/Module-shared/select-field/select-field.component';
import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';
import { AddPhotosModalComponent } from './Modlas/add-photos-modal/add-photos-modal.component';
import { DialogSharedComponent } from 'src/app/shared/Module-shared/dialog-shared/dialog-shared.component';
import { EditorModule } from 'primeng/editor';
import { SearchFieldComponent } from 'src/app/shared/Module-shared/search-field/search-field.component';
import { IsImagePipe } from 'src/app/shared/pipes/is-image.pipe';
import { InputNumberFieldComponent } from 'src/app/shared/Module-shared/input-number-field/input-number-field.component';
import { CalenderFeildComponent } from 'src/app/shared/Module-shared/calender-feild/calender-feild.component';

@NgModule({
    declarations: [MediaCenterComponent, AddPhotosModalComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: MediaCenterComponent,
            },
        ]),
        TableModule,
        ButtonComponentComponent,
        InputFieldComponent,
        IconSharedComponent,
        TextAreaFieldComponent,
        ReactiveFormsModule,
        CheckBoxComponent,
        FileUploadModule,
        UploadFilesComponent,
        SelectFieldComponent,
        TabViewModule,
        ImageModule,
        DialogSharedComponent,
        EditorModule,
        SearchFieldComponent,
        FormsModule,
        MultiSelectFieldComponent,IsImagePipe ,
        InputNumberFieldComponent,
        CalenderFeildComponent
    ],
})
export class MediaCenterModule {}
