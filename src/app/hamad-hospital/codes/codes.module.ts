import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodesComponent } from './codes.component';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonComponentComponent } from 'src/app/shared/Module-shared/button-component/button-component.component';
import { InputFieldComponent } from 'src/app/shared/Module-shared/input-field/input-field.component';
import { IconSharedComponent } from 'src/app/shared/Module-shared/icon-shared/icon-shared.component';
import { CheckBoxComponent } from 'src/app/shared/Module-shared/check-box/check-box.component';
import { SelectFieldComponent } from 'src/app/shared/Module-shared/select-field/select-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CodesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
            path: '',
            component: CodesComponent,
        },
    ]),
    TableModule,
    ButtonComponentComponent,
    InputFieldComponent,
    IconSharedComponent,
    ReactiveFormsModule,
    CheckBoxComponent,
    SelectFieldComponent,
    ReactiveFormsModule,
    FormsModule
],
})
export class CodesModule { }
