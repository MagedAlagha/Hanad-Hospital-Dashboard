import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ServicesPageService } from '../../services-page.service';

@Component({
  selector: 'app-prosthetics-types',
  templateUrl: './prosthetics-types.component.html',
  styleUrls: ['./prosthetics-types.component.scss']
})
export class ProstheticsTypesComponent {
    formprostheticsTypes!: FormGroup<any>;
    prostheticsTypes$!: Observable<any>;
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
        console.log('test')
        this.prostheticsTypes$ = this._servicesPageService.Selector$('prostheticsTypes');
    }

    save() {
        this._servicesPageService.saveProstheticsTypes(this.formprostheticsTypes.value);
    }
    clear() {}
    editItem(item: any) {}
    deleteItem(item: any) {
        this._servicesPageService.deleteProstheticsTypes(item.ID);
    }

    closeDialog() {
        this._servicesPageService.displayDialogs('prostheticsTypesDialog', false);
    }
}
