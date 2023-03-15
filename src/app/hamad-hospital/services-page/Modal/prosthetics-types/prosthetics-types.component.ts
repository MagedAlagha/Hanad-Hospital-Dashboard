import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { ServicesPageService } from '../../services-page.service';

@Component({
    selector: 'app-prosthetics-types',
    templateUrl: './prosthetics-types.component.html',
    styleUrls: ['./prosthetics-types.component.scss'],
})
export class ProstheticsTypesComponent {
    formprostheticsTypes!: FormGroup<any>;
    prostheticsTypes$!: Observable<any>;
    ID: any;
    constructor(
        fb: FormBuilder,
        private _servicesPageService: ServicesPageService
    ) {
        this.formprostheticsTypes = fb.group({
            ID: [null],
            NameAr: [null],
            NameEn: [null],
            ParentID: [null],
            IsActive: [null],
            Sorting: [null],
        });
    }
    /* id:[''], */

    ngOnInit() {
        console.log('test');
        this.prostheticsTypes$ = this._servicesPageService
            .Selector$('prostheticsTypes')
            .pipe(
                tap((value) => {
                    console.log('fawfwwfwfw', value);
                })
            );
    }

    save() {
        if (!this.ID) {
            this._servicesPageService.saveProstheticsTypes(
                this.formprostheticsTypes.value
            );
        } else {
            this._servicesPageService.saveProstheticsTypes({
                ...this.formprostheticsTypes.value,
                ID: this.ID,
            });
        }
    }
    clear() {
        this.formprostheticsTypes.reset();
    }
    editItem(item: any) {
        this.formprostheticsTypes.patchValue(item);
        this.ID = item.ID;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    deleteItem(item: any) {
        this._servicesPageService.deleteProstheticsTypes(item.ID);
    }

    closeDialog() {
        this._servicesPageService.displayDialogs(
            'prostheticsTypesDialog',
            false
        );
        this._servicesPageService.getProstheticsTypeselect();
    }

    addOrEdit(item?: any, ParentID?: any) {
        this._servicesPageService.displayDialogs(
            'addSubitemModalDialog',
            true,
            { dataEdit: item, ParentID: ParentID }
        );
    }

    del(item: any) {
        this._servicesPageService.deleteProstheticsTypes(item.ID);
    }
}
