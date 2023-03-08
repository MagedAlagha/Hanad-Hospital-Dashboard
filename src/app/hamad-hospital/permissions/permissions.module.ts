import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsComponent } from './permissions.component';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonComponentComponent } from 'src/app/shared/Module-shared/button-component/button-component.component';
import { InputFieldComponent } from 'src/app/shared/Module-shared/input-field/input-field.component';
import { IconSharedComponent } from 'src/app/shared/Module-shared/icon-shared/icon-shared.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckBoxComponent } from 'src/app/shared/Module-shared/check-box/check-box.component';
import { SelectFieldComponent } from 'src/app/shared/Module-shared/select-field/select-field.component';



@NgModule({
  declarations: [
    PermissionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
            path: '',
            component: PermissionsComponent,
        },

    ]),
    TableModule,
    ButtonComponentComponent,
    InputFieldComponent,
    IconSharedComponent,
    ReactiveFormsModule,
    CheckBoxComponent,
    SelectFieldComponent
 ]
})
export class PermissionsModule { }
