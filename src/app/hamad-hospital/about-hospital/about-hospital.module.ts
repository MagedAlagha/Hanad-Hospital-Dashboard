import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutHospitalComponent } from './about-hospital.component';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonComponentComponent } from 'src/app/shared/Module-shared/button-component/button-component.component';
import { InputFieldComponent } from 'src/app/shared/Module-shared/input-field/input-field.component';
import { IconSharedComponent } from 'src/app/shared/Module-shared/icon-shared/icon-shared.component';
import { TextAreaFieldComponent } from 'src/app/shared/Module-shared/text-area-field/text-area-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckBoxComponent } from 'src/app/shared/Module-shared/check-box/check-box.component';

import {EditorModule} from 'primeng/editor';


@NgModule({
  declarations: [
    AboutHospitalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
            path: '',
            component: AboutHospitalComponent,
        },

    ]),
    TableModule,
    ButtonComponentComponent,
    InputFieldComponent,
    IconSharedComponent,
    TextAreaFieldComponent ,
    ReactiveFormsModule,
    CheckBoxComponent,
    EditorModule,
    FormsModule
]
})
export class AboutHospitalModule { }