import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputFieldComponent } from 'src/app/shared/Module-shared/input-field/input-field.component';
import { ButtonComponentComponent } from 'src/app/shared/Module-shared/button-component/button-component.component';
import { IconSharedComponent } from 'src/app/shared/Module-shared/icon-shared/icon-shared.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextAreaFieldComponent } from 'src/app/shared/Module-shared/text-area-field/text-area-field.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckBoxComponent } from 'src/app/shared/Module-shared/check-box/check-box.component';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
    declarations: [ServicesComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ServicesComponent,
            },
        ]),
        TableModule,
        ButtonComponentComponent,
        InputFieldComponent,
        IconSharedComponent,
        TextAreaFieldComponent,
        ReactiveFormsModule,
        InputSwitchModule,
        CheckBoxComponent,
        FileUploadModule,
    ],
})
export class ServicesModule {}
