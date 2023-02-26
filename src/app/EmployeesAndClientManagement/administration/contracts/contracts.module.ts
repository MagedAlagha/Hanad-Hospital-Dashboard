import { ButtonModule } from 'primeng/button';
import { SelectFieldComponent } from 'src/app/shared/Module-shared/select-field/select-field.component';
import { CalenderFeildComponent } from './../../../shared/Module-shared/calender-feild/calender-feild.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from './../../../shared/Module-shared/input-field/input-field.component';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractsComponent } from './contracts.component';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputNumberFieldComponent } from 'src/app/shared/Module-shared/input-number-field/input-number-field.component';
import { ButtonComponentComponent } from 'src/app/shared/Module-shared/button-component/button-component.component';
import { IconSharedComponent } from 'src/app/shared/Module-shared/icon-shared/icon-shared.component';
import { DialogSharedComponent } from 'src/app/shared/Module-shared/dialog-shared/dialog-shared.component';
import { SearchFieldComponent } from 'src/app/shared/Module-shared/search-field/search-field.component';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckBoxComponent } from 'src/app/shared/Module-shared/check-box/check-box.component';
import { SpinnerLoadingComponent } from 'src/app/shared/Module-shared/spinner-loading/spinner-loading.component';
import { AddFormContractsComponent } from './add-form-contracts/add-form-contracts.component';
import { EditorModule } from 'primeng/editor';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ContractsComponent,
            },
        ]),
        TableModule,
        InputFieldComponent,
        EditorModule,
        ReactiveFormsModule,
        CalenderFeildComponent,
        SelectFieldComponent,
        DialogModule,
        InputNumberFieldComponent,
        ButtonModule,
        ButtonComponentComponent,
        IconSharedComponent,
        DialogSharedComponent,
        SearchFieldComponent,
        FormsModule,
        FileUploadModule,
        CheckBoxComponent,
        SpinnerLoadingComponent,
    ],
    declarations: [ContractsComponent, AddFormContractsComponent],
})
export class ContractsModule {}
