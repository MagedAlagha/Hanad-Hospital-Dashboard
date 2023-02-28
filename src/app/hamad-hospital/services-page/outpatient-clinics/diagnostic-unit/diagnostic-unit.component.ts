import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ServicesPageService } from '../../services-page.service';

@Component({
  selector: 'app-diagnostic-unit',
  templateUrl: './diagnostic-unit.component.html',
  styleUrls: ['./diagnostic-unit.component.scss']
})
export class DiagnosticUnitComponent {
    formOutpatientClinicsSectionAr!: FormGroup<any>;
    formOutpatientClinicsSectionEn!: FormGroup<any>;
    prosthetics$!: Observable<any>;

    constructor(
        fb: FormBuilder,
        private _servicesPageService: ServicesPageService
    ) {
        this.formOutpatientClinicsSectionAr = fb.group({
            outpatientClinicsSectionAr: [null],
        });
        this.formOutpatientClinicsSectionEn = fb.group({
            outpatientClinicsSectionEn: [null],
        });
    }

    ngOnInit() {
        this.prosthetics$ = this._servicesPageService.Selector$('prosthetics');
    }

    saveOutpatientClinicsSectionAr(){
        this._servicesPageService.saveOutpatientClinicsSectionAr(this.formOutpatientClinicsSectionAr.value);
        this.formOutpatientClinicsSectionAr.reset();
    }

    saveOutpatientClinicsSectionEn(){
    this._servicesPageService.saveOutpatientClinicsSectionEn(this.formOutpatientClinicsSectionEn.value);
    this.formOutpatientClinicsSectionEn.reset();
    }




}
