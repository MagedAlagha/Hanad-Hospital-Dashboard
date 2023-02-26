import { Observable } from 'rxjs/internal/Observable';
import { switchMap, map } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { FieldManagmentService } from '../field-managment-module.service';
import { of, tap, combineLatest } from 'rxjs';
@Component({
    selector: 'app-fields-for-category',
    templateUrl: './fields-for-category.component.html',
    styleUrls: ['./fields-for-category.component.scss'],
})
export class FieldsForCategoryComponent implements OnInit {
    @Input() ComponentType!: string;
    FieldsForCategory$!: Observable<any>;
    FieldsForCategory: any = [];
    loading: boolean = false;
    constructor(private _fieldManagmentService: FieldManagmentService) {}

    ngOnInit(): void {
        this.loading = true;
        this.FieldsForCategory$ = combineLatest({
            FieldsForCategory: this._fieldManagmentService.SelectorByComponent$(
                'FieldsForCategory',
                this.ComponentType
            ),
            Fields: this._fieldManagmentService.SelectorByComponent$(
                'Fields',
                this.ComponentType
            ),
        }).pipe(
            tap((value: any) => {
                // if (!value.FieldsForCategory.data.length) return;
                // if (!value.Fields.data.length) return;

                this.FieldsForCategory = value.Fields.data.map((x: any) => {
                    x.checked = value.FieldsForCategory.data.some(
                        (y: any) => y.FieldId == x.ID
                    );
                    return x;
                });
                this.loading = false;
            })
        );
    }
    addFeildForCategory() {
        let body = {
            commonFieldId: this.FieldsForCategory?.filter(
                (field: any) => field.checked
            )
                .map((field: any) => field.ID)
                .join(','),
            fileUploadCategoryId:
                this._fieldManagmentService.dataStore[this.ComponentType]
                    .CategorySelected,
        };
        this._fieldManagmentService
            .addFeildForCategory(body)
            .subscribe((x) => {});
    }

    close() {
        this._fieldManagmentService.displayDialogs(
            this.ComponentType,
            'FieldsForCategoryDialog',
            false
        );
    }
}
