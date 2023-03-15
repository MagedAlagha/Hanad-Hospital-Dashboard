import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
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
        private _servicesPageService: ServicesPageService,
        private messageService: MessageService,
        private _translateService: TranslateService
    ) {
        this.formServicesPage = fb.group({
            ID: [null],
            NameAr: [null , Validators.required],
            NameEn: [null , Validators.required],
            IsActive: [null , Validators.required],
            Sorting: [null , Validators.required],
        });
    }

    ngOnInit() {
           this.dataTable$ = this._servicesPageService.Selector$('dataTable');
    }

    save() {
        if (this.formServicesPage.invalid) {
            this.messageService.add({
                severity: 'error',
                detail: this._translateService.instant(
                    'الحقول مطلوبة'
                ),
            });
        } else{
            this._servicesPageService.saveMedicalRehabilitationFeatures(
                this.formServicesPage.value
            );
            this.clear()
        }
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
