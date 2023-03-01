import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { ServicesPageService } from '../../services-page.service';

@Component({
  selector: 'app-add-main-item-modal',
  templateUrl: './add-main-item-modal.component.html',
  styleUrls: ['./add-main-item-modal.component.scss']
})
export class AddMainItemModalComponent {
    formprostheticsTypes!: FormGroup<any>;
    prostheticsTypes$!: Observable<any>;
    ID: any;
    data:any;
    constructor(
        fb: FormBuilder,
        private _servicesPageService: ServicesPageService
    ) {
        this.formprostheticsTypes = fb.group({
            ID: [],
            NameAr: [''],
            NameEn: [''],
            IsActive: [false],
            Sorting: [''],
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
            this.data = this._servicesPageService.dataStore.addMainItemDialog?.data;
            if(this.data){
                this.ID = this.data.ID
                console.log('data /***', this.ID );
            }
    }

    save() {
        if(!this.ID){
            this._servicesPageService.saveProstheticsTypes(
                this.formprostheticsTypes.value
            );
        }else{
            this._servicesPageService.saveProstheticsTypes(
              {... this.formprostheticsTypes.value , ParentID:this.ID}
            );
        }
    }
    clear() {
        this.formprostheticsTypes.reset();
    }
    editItem(item: any) {
        this.formprostheticsTypes.patchValue(item);
        this.ID = item.ID;
    }
    deleteItem(item: any) {
        this._servicesPageService.deleteProstheticsTypes(item.ID);
    }


    closeDialog() {
        this._servicesPageService.displayDialogs(
            'addMainItemDialog',
            false
        );
    }
}
