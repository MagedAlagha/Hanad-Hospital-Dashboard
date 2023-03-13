import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
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
            ID: [null],
            NameAr: [null],
            NameEn: [null],
            IsActive: [null],
            Sorting: [null],
        });
    }

    ngOnInit() {
           this.dataTable$ = this._servicesPageService.Selector$('dataTable');
    }

    save() {
        this._servicesPageService.saveMedicalRehabilitationFeatures(
            this.formServicesPage.value
        );
    }
    clear() {
        this.formServicesPage.reset();
    }
    editItem(item: any) {
        this.formServicesPage.patchValue(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    deleteItem(item: any) {
        this._servicesPageService.deleteMedicalRehabilitationFeatures(item.ID);
    }
}
