import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, filter, tap } from 'rxjs';
import { ServicesPageService } from '../services-page.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-prosthetics',
    templateUrl: './prosthetics.component.html',
    styleUrls: ['./prosthetics.component.scss'],
})
export class ProstheticsComponent {
    formprosthetics!: FormGroup<any>;
    prosthetics$!: Observable<any>;
    prostheticsTypes$!: Observable<any>;
    ProstheticsTypeselect$!: Observable<any>;
    isEn = document.dir == 'ltr' ? true : false;
    constructor(
        fb: FormBuilder,
        private _servicesPageService: ServicesPageService,
        private messageService: MessageService,
        private _translateService: TranslateService
    ) {
        this.formprosthetics = fb.group({
            ID: [null],
            ProstheticsTypeID: [null, Validators.required],
            NameAr: [null, Validators.required],
            NameEn: ['نص'],
            AgeAr: [null, Validators.required],
            AgeEn: ['نص'],
            IsActive: [false],
            Sorting: [null, Validators.required],
        });
    }

    /* id:[''], */

    ngOnInit() {
        console.log('test');
        this.prosthetics$ = this._servicesPageService
            .Selector$('prosthetics')
            .pipe(
                map((prostheticsTypes) => {
                    console.log('prostheticsTypes',prostheticsTypes)
                    return prostheticsTypes.filter(
                        (value: any) => value?.ProstheticsTypeName != null
                    );
                })
            );
        this.prostheticsTypes$ = this._servicesPageService
            .Selector$('prostheticsTypes')
            .pipe(
                tap((value) => {
                    console.log('value', value);
                }),
                map((prostheticsTypes) => {
                    return prostheticsTypes.filter(
                        (value: any) => value?.ParentID
                    );
                })
            );
        this.ProstheticsTypeselect$ = this._servicesPageService
            .Selector$('ProstheticsTypeselect')
            .pipe(
                tap((value) => {
                    console.log('value1011010101', value);
                })
                // map((prostheticsTypes) => {
                //     return prostheticsTypes.filter(
                //         (value: any) => value?.ParentID != null
                //     );
                // })
            );
    }

    save() {
        if (this.formprosthetics.invalid) {
            this.messageService.add({
                severity: 'error',
                detail: this._translateService.instant('الحقول مطلوبة'),
            });
        } else {
            this._servicesPageService.saveprosthetics(
                this.formprosthetics.value
            );
            this.clear();
        }
    }
    clear() {
        this.formprosthetics.reset();
        this.formprosthetics.get('IsActive')?.patchValue(false);
        this.formprosthetics.get('AgeEn')?.patchValue('نص');
        this.formprosthetics.get('NameEn')?.patchValue('نص');
    }
    editItem(item: any) {
        this.formprosthetics.patchValue(item);
        window.scrollTo({ top: 2 });
    }
    deleteItem(item: any) {
        this._servicesPageService.deleteprosthetics(item.ID);
    }

    addArtificiallimbDialog(item?: any) {
        this._servicesPageService.displayDialogs(
            'prostheticsTypesDialog',
            true,
            item
        );
    }
}
