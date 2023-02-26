import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewEvaluationComponent } from './view-evaluation.component';
import { CategoryForEvaluationComponent } from '../category-for-evaluation/category-for-evaluation.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { InputNumberFieldComponent } from '../../Module-shared/input-number-field/input-number-field.component';
import { InputFieldComponent } from '../../Module-shared/input-field/input-field.component';

@NgModule({
    imports: [
        CommonModule,
        TableModule,
        RadioButtonModule,
        FormsModule,
        InputNumberFieldComponent,
        InputFieldComponent,
    ],
    declarations: [ViewEvaluationComponent, CategoryForEvaluationComponent],
    exports: [ViewEvaluationComponent],
})
export class ViewEvaluationModule {}
