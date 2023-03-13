import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable, filter, tap } from 'rxjs';
import { ServicesPageService } from '../services-page.service';

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
        private _servicesPageService: ServicesPageService
    ) {
        this.formprosthetics = fb.group({
            ID: [null],
            ProstheticsTypeID: [null],
            NameAr: [null],
            NameEn: [null],
            AgeAr: [null],
            AgeEn: [null],
            IsActive: [null],
            Sorting: [null],
        });
    }

    /* id:[''], */

    ngOnInit() {
        console.log('test');
        this.prosthetics$ = this._servicesPageService.Selector$('prosthetics');
        this.prostheticsTypes$ = this._servicesPageService
            .Selector$('prostheticsTypes')
            .pipe(
                tap((value) => {
                    console.log('value',value);
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
                    console.log('value',value);
                }),
                map((prostheticsTypes) => {
                    return prostheticsTypes.filter(
                        (value: any) => value?.ParentID
                    );
                })
            );
    }

    save() {
        this._servicesPageService.saveprosthetics(this.formprosthetics.value);
    }
    clear() {}
    editItem(item: any) {
        this.formprosthetics.patchValue(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
