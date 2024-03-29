import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementsComponent } from './advertisements.component';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonComponentComponent } from 'src/app/shared/Module-shared/button-component/button-component.component';
import { InputFieldComponent } from 'src/app/shared/Module-shared/input-field/input-field.component';
import { IconSharedComponent } from 'src/app/shared/Module-shared/icon-shared/icon-shared.component';
import { TextAreaFieldComponent } from 'src/app/shared/Module-shared/text-area-field/text-area-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckBoxComponent } from 'src/app/shared/Module-shared/check-box/check-box.component';
import { InputNumberFieldComponent } from 'src/app/shared/Module-shared/input-number-field/input-number-field.component';
import { SelectFieldComponent } from 'src/app/shared/Module-shared/select-field/select-field.component';
import { EditorModule } from 'primeng/editor';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    AdvertisementsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
            path: '',
            component: AdvertisementsComponent,
        },

    ]),
    TableModule,
    ButtonComponentComponent,
    InputFieldComponent,
    IconSharedComponent,
    TextAreaFieldComponent ,
    ReactiveFormsModule,
    CheckBoxComponent,
     InputNumberFieldComponent ,
     SelectFieldComponent,
     EditorModule,
     CKEditorModule
    ]
})
export class AdvertisementsModule { }
