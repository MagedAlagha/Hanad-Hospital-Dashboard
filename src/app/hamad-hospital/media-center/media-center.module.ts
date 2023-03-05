import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaCenterComponent } from './media-center.component';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonComponentComponent } from 'src/app/shared/Module-shared/button-component/button-component.component';
import { InputFieldComponent } from 'src/app/shared/Module-shared/input-field/input-field.component';
import { IconSharedComponent } from 'src/app/shared/Module-shared/icon-shared/icon-shared.component';
import { TextAreaFieldComponent } from 'src/app/shared/Module-shared/text-area-field/text-area-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckBoxComponent } from 'src/app/shared/Module-shared/check-box/check-box.component';
import { FileUploadModule } from 'primeng/fileupload';
import { UploadFilesComponent } from 'src/app/shared/Module-shared/upload-files/upload-files.component';



@NgModule({
  declarations: [
    MediaCenterComponent
  ],
  imports: [
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
    TextAreaFieldComponent ,
    ReactiveFormsModule,
    CheckBoxComponent,
    FileUploadModule,
    UploadFilesComponent,
  ]
})
export class MediaCenterModule { }
