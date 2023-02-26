import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFieldModule } from '../dynamic-field/dynamic-field.module';
import { ButtonComponentComponent } from '../../Module-shared/button-component/button-component.component';

@NgModule({
    imports: [
        CommonModule,
        DynamicFieldModule,
        ReactiveFormsModule,
        ButtonComponentComponent,
    ],
    declarations: [DynamicFormComponent],
    exports: [DynamicFormComponent],
})
export class DynamicFormModule {}
