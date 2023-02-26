import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';
import { IconSharedComponent } from 'src/app/shared/Module-shared/icon-shared/icon-shared.component';
import { InputFieldComponent } from 'src/app/shared/Module-shared/input-field/input-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalenderFeildComponent } from 'src/app/shared/Module-shared/calender-feild/calender-feild.component';
import { DialogModule } from 'primeng/dialog';
import { SelectFieldComponent } from 'src/app/shared/Module-shared/select-field/select-field.component';
import { ButtonComponentComponent } from 'src/app/shared/Module-shared/button-component/button-component.component';
import { ButtonModule } from 'primeng/button';
import { InputNumberFieldComponent } from 'src/app/shared/Module-shared/input-number-field/input-number-field.component';
import { SearchFieldComponent } from 'src/app/shared/Module-shared/search-field/search-field.component';
import { DialogSharedComponent } from 'src/app/shared/Module-shared/dialog-shared/dialog-shared.component';
import { SpinnerLoadingComponent } from 'src/app/shared/Module-shared/spinner-loading/spinner-loading.component';
import { CheckBoxComponent } from 'src/app/shared/Module-shared/check-box/check-box.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ClientsDialogComponent } from './clients-dialog/clients-dialog.component';
import { TextAreaFieldComponent } from 'src/app/shared/Module-shared/text-area-field/text-area-field.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ClientsComponent,
            },
        ]),

        TableModule,
        InputFieldComponent,
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
        TextAreaFieldComponent
    ],
    declarations: [ClientsComponent, ClientsDialogComponent],
})
export class ClientsModule {}
