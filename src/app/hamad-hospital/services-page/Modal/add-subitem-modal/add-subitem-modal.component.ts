import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ServicesPageService } from '../../services-page.service';

@Component({
    selector: 'app-add-subitem-modal',
    templateUrl: './add-subitem-modal.component.html',
    styleUrls: ['./add-subitem-modal.component.scss'],
})
export class AddSubitemModalComponent {
    formSubItemTypes!: FormGroup<any>;
    prostheticsTypes$!: Observable<any>;
    constructor(
        fb: FormBuilder,
        private _servicesPageService: ServicesPageService
    ) {
        this.formSubItemTypes = fb.group({
            ID: [''],
            NameAr: [''],
            NameEn: [''],
            IsActive: [false],
            Sorting: [''],
            ParentID: [''],
        });
    }
    ngOnInit() {
        console.log('test');

        const data =
            this._servicesPageService.dataStore.addSubitemModalDialog?.data;

        if (data) {
            console.log('data', data);
            this.formSubItemTypes.patchValue({ ParentID: data?.ParentID });
            this.formSubItemTypes.patchValue(data?.dataEdit);
            console.log('formSubItemTypes', this.formSubItemTypes?.value);
        }
    }
    save() {
        this._servicesPageService
            .saveProstheticsTypes({
                ...this.formSubItemTypes.value,
            })
            .subscribe((value) => {
                this.formSubItemTypes.reset();
            });
    }
    clear() {
        this.formSubItemTypes.reset();
    }
    editItem(item: any) {
        this.formSubItemTypes.patchValue(item);
    }
    deleteItem(item: any) {
        this._servicesPageService.deleteProstheticsTypes(item.ID);
    }
    closeDialog() {
        this._servicesPageService.displayDialogs(
            'addSubitemModalDialog',
            false
        );
    }
}
