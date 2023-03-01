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
import { ProstheticsComponent } from './prosthetics/prosthetics.component';
import { SelectFieldComponent } from 'src/app/shared/Module-shared/select-field/select-field.component';
import { HearingBalanceComponent } from './hearing-balance/hearing-balance.component';
import { ProstheticsTypesComponent } from './Modal/prosthetics-types/prosthetics-types.component';
import { DialogSharedComponent } from 'src/app/shared/Module-shared/dialog-shared/dialog-shared.component';
import { DiagnosticUnitComponent } from './outpatient-clinics/diagnostic-unit/diagnostic-unit.component';
import { TreeComponent } from 'src/app/shared/Module-shared/tree/tree.component';
import { AddSubitemModalComponent } from './Modal/add-subitem-modal/add-subitem-modal.component';
import { AddMainItemModalComponent } from './Modal/add-main-item-modal/add-main-item-modal.component';



@NgModule({
  declarations: [
    ServicesPageComponent,
    MedicalRehabilitationFeaturesComponent,
    MedicalRehabilitationServicesComponent,
    ProstheticsComponent,
    HearingBalanceComponent,
    ProstheticsTypesComponent,
    DiagnosticUnitComponent,
    AddSubitemModalComponent,
    AddMainItemModalComponent
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
    TabViewModule,
    SelectFieldComponent,
    DialogSharedComponent,
    TreeComponent
  ]
})
export class ServicesPageModule { }
