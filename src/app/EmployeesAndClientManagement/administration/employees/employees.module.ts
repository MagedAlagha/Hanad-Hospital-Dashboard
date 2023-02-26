import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';
import { ButtonComponentComponent } from '../../../shared/Module-shared/button-component/button-component.component';
import { InputFieldComponent } from '../../../shared/Module-shared/input-field/input-field.component';
import { TableModule } from 'primeng/table';
import { IconSharedComponent } from '../../../shared/Module-shared/icon-shared/icon-shared.component';
import { AccordionModule } from 'primeng/accordion';
import { AddFormEmployessComponent } from './Modals/add-form-employess/add-form-employess.component';
import { DialogSharedComponent } from '../../../shared/Module-shared/dialog-shared/dialog-shared.component';
import { CalenderFeildComponent } from '../../../shared/Module-shared/calender-feild/calender-feild.component';
import { SelectFieldComponent } from '../../../shared/Module-shared/select-field/select-field.component';
import { InputNumberFieldComponent } from '../../../shared/Module-shared/input-number-field/input-number-field.component';
import { EditorFieldComponent } from '../../../shared/Module-shared/editor-field/editor-field.component';
import { MultiSelectFieldComponent } from '../../../shared/Module-shared/multi-select-field/multi-select-field.component';
import { AutoCompleteFeildComponent } from '../../../shared/Module-shared/auto-complete-feild/auto-complete-feild.component';
import { SearchFieldComponent } from '../../../shared/Module-shared/search-field/search-field.component';
import { TextAreaFieldComponent } from 'src/app/shared/Module-shared/text-area-field/text-area-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordModalComponent } from './Modals/change-password-modal/change-password-modal.component';

@NgModule({
    declarations: [EmployeesComponent, AddFormEmployessComponent, ChangePasswordModalComponent],
    imports: [
        CommonModule,
        AccordionModule,
        TableModule,
        RouterModule.forChild([
            {
                path: '',
                component: EmployeesComponent,
            },
        ]),
        ButtonComponentComponent,
        InputFieldComponent,
        IconSharedComponent,
        DialogSharedComponent,
        CalenderFeildComponent,
        SelectFieldComponent,
        InputNumberFieldComponent,
        EditorFieldComponent,
        MultiSelectFieldComponent,
        AutoCompleteFeildComponent,
        SearchFieldComponent,
        TextAreaFieldComponent ,
        ReactiveFormsModule
    ],
})
export class EmployeesModule {}
