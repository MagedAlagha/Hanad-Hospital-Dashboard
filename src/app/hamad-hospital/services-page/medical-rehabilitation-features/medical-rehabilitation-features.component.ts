import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ServicesPageService } from '../services-page.service';

@Component({
    selector: 'app-medical-rehabilitation-features',
    templateUrl: './medical-rehabilitation-features.component.html',
    styleUrls: ['./medical-rehabilitation-features.component.scss'],
})
export class MedicalRehabilitationFeaturesComponent {
    formServicesPage!: FormGroup<any>;
    dataTable$!: Observable<any>;
    ID:any;
    constructor(
        fb: FormBuilder,
        private _servicesPageService: ServicesPageService
    ) {
        this.formServicesPage = fb.group({
            ID: [null],
            NameAr: [null],
            NameEn: [null],
            IsActive: [null],
            Sorting: [null],
        });
    }
    /* id:[''], */

    ngOnInit() {
        this.dataTable$ = this._servicesPageService.Selector$('dataTable');
    }

    save() {
       if(!this.ID){
        this._servicesPageService.saveMedicalRehabilitationFeatures(this.formServicesPage.value);
       }else{
        this._servicesPageService.saveMedicalRehabilitationFeatures({
            ...this.formServicesPage.value ,
            ID:this.ID
        });
       }
    }
    clear() {
        this.formServicesPage.reset();
    }
    editItem(item: any) {
       this.formServicesPage.patchValue(item);
       this.ID = item.ID;
       window.scroll(0, 0);
    }
    deleteItem(item: any) {
        this._servicesPageService.deleteMedicalRehabilitationFeatures(item.ID);
    }
}
