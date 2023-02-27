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

    constructor(
        fb: FormBuilder,
        private _servicesPageService: ServicesPageService
    ) {
        this.formServicesPage = fb.group({
            id: [0],
            nameAr: [''],
            nameEn: [''],
            isActive: [true],
            sorting: [0],
        });
    }
    /* id:[''], */

    ngOnInit() {
        this.dataTable$ = this._servicesPageService.Selector$('dataTable');
    }

    save() {
        this._servicesPageService.saveMedicalRehabilitationFeatures(this.formServicesPage.value);
    }
    clear() {}
    editItem(item: any) {}
    deleteItem(item: any) {
        this._servicesPageService.deleteMedicalRehabilitationFeatures(item.id);
    }
}
