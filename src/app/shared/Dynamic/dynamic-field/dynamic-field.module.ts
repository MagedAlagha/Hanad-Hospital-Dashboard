import { TextAreaFieldComponent } from './../../Module-shared/text-area-field/text-area-field.component';
import { SearchFieldComponent } from './../../Module-shared/search-field/search-field.component';
import { ButtonComponentComponent } from './../../Module-shared/button-component/button-component.component';
import { InputNumberFieldComponent } from './../../Module-shared/input-number-field/input-number-field.component';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { AutoCompleteFeildComponent } from './../../Module-shared/auto-complete-feild/auto-complete-feild.component';
import { CalenderFeildComponent } from './../../Module-shared/calender-feild/calender-feild.component';
import { SelectFieldComponent } from './../../Module-shared/select-field/select-field.component';
import { InputFieldComponent } from './../../Module-shared/input-field/input-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFieldComponent } from './dynamic-field.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        InputFieldComponent,
        CalenderFeildComponent,
        SelectFieldComponent,
        AutoCompleteFeildComponent,
        TableModule,
        DialogModule,
        InputNumberFieldComponent,
        ButtonComponentComponent,
        SearchFieldComponent,
        TextAreaFieldComponent,
    ],
    declarations: [DynamicFieldComponent],
    exports: [DynamicFieldComponent],
})
export class DynamicFieldModule {}
