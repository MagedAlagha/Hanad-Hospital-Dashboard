import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ServicesPageService } from '../services-page.service';

@Component({
  selector: 'app-medical-rehabilitation-services',
  templateUrl: './medical-rehabilitation-services.component.html',
  styleUrls: ['./medical-rehabilitation-services.component.scss']
})
export class MedicalRehabilitationServicesComponent {
    formMedicalRehabilitationServices!: FormGroup<any>;
    dataTable$!: Observable<any>;

    constructor(
        fb: FormBuilder,
        private _servicesPageService: ServicesPageService
    ) {
        this.formMedicalRehabilitationServices = fb.group({
            id: [0],
            nameAr: [''],
            nameEn: [''],
            descAr: [''],
            descEn: [''],
            isActive: [true],
            sorting: [0],
        });
    }
    /* id:[''], */

    ngOnInit() {
        this.dataTable$ = this._servicesPageService.Selector$('dataTable');
    }

    save() {
        this._servicesPageService.saveMedicalRehabilitationServices(this.formMedicalRehabilitationServices.value);
    }

    clear() {}
    editItem(item: any) {}
    deleteItem(item: any) {
        this._servicesPageService.deleteMedicalRehabilitationServices(item.id);
    }
}
