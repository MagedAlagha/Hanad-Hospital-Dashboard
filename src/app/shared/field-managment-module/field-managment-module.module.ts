import { InputNumberFieldComponent } from './../Module-shared/input-number-field/input-number-field.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldManagementComponent } from './field-management.component';
import { AddFieldComponent } from './add-field/add-field.component';
import { DialogSharedComponent } from '../Module-shared/dialog-shared/dialog-shared.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponentComponent } from '../Module-shared/button-component/button-component.component';
import { CheckBoxComponent } from '../Module-shared/check-box/check-box.component';
import { InputFieldComponent } from '../Module-shared/input-field/input-field.component';
import { SelectFieldComponent } from '../Module-shared/select-field/select-field.component';
import { TranslationModule } from 'src/app/i18n';
import { IconSharedComponent } from '../Module-shared/icon-shared/icon-shared.component';
import { TableModule } from 'primeng/table';
import { SearchFieldComponent } from '../Module-shared/search-field/search-field.component';
import { ListboxModule } from 'primeng/listbox';
import { FieldsForCategoryComponent } from './fields-for-category/fields-for-category.component';
import { PanelMenuModule } from 'primeng/panelmenu';

@NgModule({
    declarations: [
        FieldManagementComponent,
        AddFieldComponent,
        FieldsForCategoryComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonComponentComponent,
        DialogSharedComponent,
        CheckBoxComponent,
        InputFieldComponent,
        InputNumberFieldComponent,
        SelectFieldComponent,
        TranslationModule,
        IconSharedComponent,
        TableModule,
        SearchFieldComponent,
        ListboxModule,
        FormsModule,
        PanelMenuModule,
    ],
    exports: [
        FieldManagementComponent,
        AddFieldComponent,
        FieldsForCategoryComponent,
    ],
})
export class FieldManagmentModule {}
