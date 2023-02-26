import { Router } from '@angular/router';
import { VerificationModule } from './../../../auth/verification/verification.module';
import { Observable } from 'rxjs/internal/Observable';
import { Component, Input, OnInit } from '@angular/core';
import { FieldManagmentService } from '../field-managment-module.service';
import { tap, map } from 'rxjs';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-add-field',
    templateUrl: './add-field.component.html',
    styleUrls: ['./add-field.component.scss'],
})
export class AddFieldComponent implements OnInit {
    FeildSelected!: any;
    @Input() ComponentType!: string;
    Codes$!: Observable<any>;
    AddFeildForm!: FormGroup;
    Options: any[] = [];
    Option = new FormControl(null, Validators.required);
    isOptions: boolean = false;
    isMinMax: boolean = false;
    submitted: boolean = false;
    constructor(
        private _fieldManagmentService: FieldManagmentService,
        private fb: FormBuilder,
        private router: Router
    ) {
        this.AddFeildForm = this.fb.group({
            Id: [0],
            Name: [null, Validators.required],
            ComponentType: [null],
            FieldTypeId: [null],
            IsRequired: null,
            MaxValue: [null],
            MinValue: [null],
            IsShowInGrid: [null],
        });
    }

    ngOnInit() {
        this.Codes$ = this._fieldManagmentService
            .SelectorByComponent$('Codes', this.ComponentType)
            .pipe(
                map((val: any) => {
                    console.log('valval', val);
                    return val?.FieldType.map((val: any) => {
                        return {
                            label: val.Name,
                            icon: 'pi pi-fw pi-pencil',
                            command: (data: any) => {
                                this.SelectFieldType(val);
                            },
                        };
                    });
                })
            );
        // this._fieldManagmentService.dataStore.
    }
    close() {
        this._fieldManagmentService.displayDialogs(
            this.ComponentType,
            'AddFieldDialog',
            false
        );
    }
    SelectFieldType(event: any) {
        console.log('SelectFieldType', event);
        this.AddFeildForm.get('FieldTypeId')?.setValue(event.Code);

        if (event.Code == 4) {
            this.isOptions = true;
        } else if (event.Code == 2) {
            this.isMinMax = true;
        } else {
            this.isOptions = false;
            this.isMinMax = false;
        }
    }
    AddOPtion() {
        this.submitted = true;
        if (this.Option?.valid) {
            this.Options.push({ OptionName: this.Option?.value, fieldId: 0 });
            this.Option.reset();
            this.submitted = false;
        }
    }

    deleteOption(rowIndex: any) {
        this.Options.splice(rowIndex, 1);
    }

    saveFeild() {
        this._fieldManagmentService
            .addFeild({
                ...this.AddFeildForm.value,
                FieldsOptions: JSON.stringify(
                    this.Options.map((item, index) => {
                        return {
                            OptionName: item.OptionName,
                            fieldId: item.fieldId,
                            OptionOrder: index,
                        };
                    })
                ),
                componentType: 'archiving',
            })
            .subscribe();
    }
}
