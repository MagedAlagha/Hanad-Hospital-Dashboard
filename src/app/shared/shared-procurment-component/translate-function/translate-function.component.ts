import { filter } from 'rxjs/operators';
import { TableModule } from 'primeng/table';
import {
    ReactiveFormsModule,
    FormGroup,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { IconSharedComponent } from '../../Module-shared/icon-shared/icon-shared.component';
import { SelectFieldComponent } from '../../Module-shared/select-field/select-field.component';
import { InputFieldComponent } from '../../Module-shared/input-field/input-field.component';
import { SearchFieldComponent } from '../../Module-shared/search-field/search-field.component';
import { ButtonComponentComponent } from '../../Module-shared/button-component/button-component.component';
import { DialogSharedComponent } from '../../Module-shared/dialog-shared/dialog-shared.component';
import { TextAreaFieldComponent } from '../../Module-shared/text-area-field/text-area-field.component';
@Component({
    standalone: true,
    imports: [
        CommonModule,
        IconSharedComponent,
        SelectFieldComponent,
        ReactiveFormsModule,
        InputFieldComponent,
        TableModule,
        SearchFieldComponent,
        ButtonComponentComponent,
        DialogSharedComponent,
        TextAreaFieldComponent,
        InputTextareaModule,
        ButtonModule,
    ],

    selector: 'app-translate-function',
    templateUrl: './translate-function.component.html',
    styleUrls: ['./translate-function.component.scss'],
})
export class TranslateFunctionComponent implements OnInit {
    TranslateForm: FormGroup;
    ValueBeforeEn: any;
    ValueBeforeAr: any;
    newValue: any;
    FinalValueEn: string = '';
    FinalValueEnSC: string = '';
    FinalValueAr: string = '';
    FinalValueArSC: string = '';

    constructor(private fb: FormBuilder) {
        this.TranslateForm = this.fb.group({
            afterEn: [null],
            beforeEn: [null, Validators.required],
            afterAr: [null],
            beforeAr: [null],
        });
    }

    formData: any;
    ngOnInit() {
        this.formData = localStorage.getItem('formData');

        if (this.formData) {
            this.TranslateForm.patchValue(JSON.parse(this.formData));
        }

        this.TranslateForm.valueChanges
            .pipe(filter((val: any) => this.TranslateForm.valid))
            .subscribe((val: any) => {
                localStorage.setItem('formData', JSON.stringify(val));
            });
    }

    Convert() {
        this.FinalValueEn = '';
        this.FinalValueAr = '';
        this.ValueBeforeEn = this.TranslateForm.get('beforeEn')
            ?.value.replace(/[()./%]/gi, '')
            .replace(/\w\S*/g, function (txt: any) {
                return (
                    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                );
            });
        this.ValueBeforeAr = this.TranslateForm.get('beforeAr')?.value.replace(
            /[()./%]/gi,
            ''
        );

        this.newValue = this.TranslateForm.get('beforeEn')
            ?.value.replace(/[()./%]/gi, '')
            .trim()
            .replace(/ /gi, '_')
            .toUpperCase();

        for (let i = 0; i < this.newValue.split(/\r\n|\r|\n/).length; i++) {
            this.FinalValueEn = this.FinalValueEn.concat(
                this.newValue.split('\n')[i] +
                    '  :  ' +
                    "'" +
                    this.ValueBeforeEn.split('\n')[i] +
                    "', " +
                    '\n'
            );
        }
        for (let i = 0; i < this.newValue.split(/\r\n|\r|\n/).length; i++) {
            this.FinalValueAr = this.FinalValueAr.concat(
                this.newValue.split('\n')[i] +
                    '  :  ' +
                    "'" +
                    this.ValueBeforeAr.split('\n')[i] +
                    "', " +
                    '\n'
            );
        }

        this.FinalValueEnSC = 'ScreenName : { \n' + this.FinalValueEn + '},';
        this.FinalValueArSC = 'ScreenName:{ \n' + this.FinalValueAr + '},';

        this.TranslateForm.get('afterEn')?.patchValue(this.FinalValueEnSC);
        this.TranslateForm.get('afterAr')?.patchValue(this.FinalValueArSC);
    }
}
