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
    ID: any;
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
        });
    }
    ngOnInit() {
        console.log('test');
        const data =
            this._servicesPageService.dataStore.addSubitemModalDialog?.data;
        if (data) {
            this.ID = data.ID;
            console.log(' this.ID', this.ID);
        } else {
            console.log('No Data');
        }
    }
    save() {
        this._servicesPageService.saveProstheticsTypes({
            ...this.formSubItemTypes.value,
            ParentID: this.ID,
        });

        /*  if(!this.ID){
            this._servicesPageService.saveProstheticsTypes(
                this.formSubItemTypes.value
            );
        }else{
            this._servicesPageService.saveProstheticsTypes(
              {... this.formSubItemTypes.value , ParentID:this.ID}
            );
        } */
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
