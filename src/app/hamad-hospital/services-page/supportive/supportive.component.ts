import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ServicesPageService } from '../services-page.service';

@Component({
  selector: 'app-supportive',
  templateUrl: './supportive.component.html',
  styleUrls: ['./supportive.component.scss']
})
export class SupportiveComponent {
    formSupportiveMedicalDepartments!: FormGroup<any>;
    prosthetics$!: Observable<any>;
    SupportiveMedicalDepartments$!: Observable<any>;
    fileSelected_2: any;
    fileSelected: any;
    @ViewChild('fileUpload') fileUpload: any;

    constructor(
        fb: FormBuilder,
        private _servicesPageService: ServicesPageService,
        private el: ElementRef
    ) {
        this.formSupportiveMedicalDepartments = fb.group({
            ID: [],
            IconPath: [],
            NameAr: [],
            NameEn: [],
            DescAr: [],
            DescEn: [],
            IsActive: [],
            Sorting: [],
        });

    }

    ngOnInit() {
        this.prosthetics$ = this._servicesPageService.Selector$('prosthetics');
        this.SupportiveMedicalDepartments$ =
            this._servicesPageService.Selector$('SupportiveMedicalDepartments');
    }

    saveformHearingDepartemt() {
        this._servicesPageService.saveSupportiveMedicalDepartments({
            ...this.formSupportiveMedicalDepartments.value,
            IconPath: this.fileSelected_2,
        });
    }
    clearformHearingDepartemt() {
        this.formSupportiveMedicalDepartments.reset();
    }



    clear() {}
    editItem(item: any) {
        this.formSupportiveMedicalDepartments.patchValue(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    deleteItem(item: any) {
        this._servicesPageService.deleteSupportiveMedicalDepartments(item.ID);
    }
}
