import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectronicServicesComponent } from './electronic-services.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ButtonComponentComponent } from 'src/app/shared/Module-shared/button-component/button-component.component';
import { CheckBoxComponent } from 'src/app/shared/Module-shared/check-box/check-box.component';
import { IconSharedComponent } from 'src/app/shared/Module-shared/icon-shared/icon-shared.component';
import { InputFieldComponent } from 'src/app/shared/Module-shared/input-field/input-field.component';
import { TextAreaFieldComponent } from 'src/app/shared/Module-shared/text-area-field/text-area-field.component';
import { UploadFilesComponent } from 'src/app/shared/Module-shared/upload-files/upload-files.component';



@NgModule({
  declarations: [
    ElectronicServicesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
            path: '',
            component: ElectronicServicesComponent,
        },

    ]),
    TableModule,
    ButtonComponentComponent,
    InputFieldComponent,
    IconSharedComponent,
    TextAreaFieldComponent ,
    ReactiveFormsModule,
    InputSwitchModule,
    CheckBoxComponent,
    FileUploadModule,
    UploadFilesComponent,
    TabViewModule
  ]
})
export class ElectronicServicesModule { }
