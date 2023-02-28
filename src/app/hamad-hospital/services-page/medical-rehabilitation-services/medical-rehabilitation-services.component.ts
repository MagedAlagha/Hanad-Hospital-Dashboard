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
    MedicalRehabilitationServices$!: Observable<any>;

    constructor(
        fb: FormBuilder,
        private _servicesPageService: ServicesPageService
    ) {
        this.formMedicalRehabilitationServices = fb.group({
            ID: [null],
            NameAr: [null],
            NameEn: [null],
            DescAr: [null],
            DescEn: [null],
            IsActive: [null],
            Sorting: [null],
        });
    }
    /* id:[''], */

    ngOnInit() {
        this.MedicalRehabilitationServices$ = this._servicesPageService.Selector$('MedicalRehabilitationServices');
    }

    save() {
        this._servicesPageService.saveMedicalRehabilitationServices(this.formMedicalRehabilitationServices.value);
    }

    clear() {}
    editItem(item: any) {}
    deleteItem(item: any) {
        this._servicesPageService.deleteMedicalRehabilitationServices(item.ID);
    }
}
