import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesPageComponent } from './services-page.component';
import { TabViewModule } from 'primeng/tabview';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { ButtonComponentComponent } from 'src/app/shared/Module-shared/button-component/button-component.component';
import { CheckBoxComponent } from 'src/app/shared/Module-shared/check-box/check-box.component';
import { IconSharedComponent } from 'src/app/shared/Module-shared/icon-shared/icon-shared.component';
import { InputFieldComponent } from 'src/app/shared/Module-shared/input-field/input-field.component';
import { TextAreaFieldComponent } from 'src/app/shared/Module-shared/text-area-field/text-area-field.component';
import { UploadFilesComponent } from 'src/app/shared/Module-shared/upload-files/upload-files.component';
import { MedicalRehabilitationFeaturesComponent } from './medical-rehabilitation-features/medical-rehabilitation-features.component';
import { MedicalRehabilitationServicesComponent } from './medical-rehabilitation-services/medical-rehabilitation-services.component';



@NgModule({
  declarations: [
    ServicesPageComponent,
    MedicalRehabilitationFeaturesComponent,
    MedicalRehabilitationServicesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
            path: '',
            component: ServicesPageComponent,
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
export class ServicesPageModule { }
