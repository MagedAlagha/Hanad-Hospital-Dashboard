import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
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
        private _servicesPageService: ServicesPageService ,
        private messageService: MessageService,
        private _translateService: TranslateService
    ) {
        this.formMedicalRehabilitationServices = fb.group({
            ID: [null],
            NameAr: [null , Validators.required],
            NameEn: ['نص'],
            DescAr: ['', Validators.required],
            DescEn: ['نص'],
            IsActive: [false ],
            Sorting: [null],
        });
    }

    ngOnInit() {
        this.MedicalRehabilitationServices$ = this._servicesPageService.Selector$('MedicalRehabilitationServices');
    }

    save() {

        if (this.formMedicalRehabilitationServices.invalid) {
            this.messageService.add({
                severity: 'error',
                detail: this._translateService.instant(
                    ' يوجد حقول مطلوبة '
                ),
            });
        } else{
            this._servicesPageService.saveMedicalRehabilitationServices(this.formMedicalRehabilitationServices.value);
            this.clear();
        }
    }

    clear() {
        this.formMedicalRehabilitationServices.reset();
        this.formMedicalRehabilitationServices.get('IsActive')?.patchValue(false)
        this.formMedicalRehabilitationServices.get('NameEn')?.patchValue('نص')
        this.formMedicalRehabilitationServices.get('DescEn')?.patchValue('نص')
    }
    editItem(item: any) {
        this.formMedicalRehabilitationServices.patchValue(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    deleteItem(item: any) {
        this._servicesPageService.deleteMedicalRehabilitationServices(item.ID);
    }
}



