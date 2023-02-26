import { Component, Input, OnInit } from '@angular/core';
import { Observable, tap, combineLatest } from 'rxjs';
import { FieldManagmentService } from './field-managment-module.service';

@Component({
    selector: 'app-field-management',
    templateUrl: './field-management.component.html',
    styleUrls: ['./field-management.component.scss'],
})
export class FieldManagementComponent implements OnInit {
    FieldManagementData$!: Observable<any>;
    @Input() ComponentType: string = '';

    constructor(private _fieldManagmentService: FieldManagmentService) {}

    ngOnInit() {
        this.FieldManagementData$ = combineLatest({
            Fields: this._fieldManagmentService
                .SelectorByComponent$('Fields', this.ComponentType)
                .pipe(tap((x) => console.log(x))),
            AddFieldDialog: this._fieldManagmentService.SelectorByComponent$(
                'AddFieldDialog',
                this.ComponentType
            ),
            openClassificationManagement:
                this._fieldManagmentService.SelectorByComponent$(
                    'openClassificationManagement',
                    this.ComponentType
                ),
        });
    }

    openAddOrEditField(item?:any) {
        this._fieldManagmentService.displayDialogs(
            this.ComponentType,
            'AddFieldDialog',
            true,
            item
        );
    }

    deleteFeild(ID: any) {
        this._fieldManagmentService.deleteFeild(ID).subscribe((x) => {
            this._fieldManagmentService.getFields(this.ComponentType);
        });
    }
    close() {
        this._fieldManagmentService.displayDialogs(
            this.ComponentType,
            'FieldManagmentDialog',
            false
        );
    }
}
