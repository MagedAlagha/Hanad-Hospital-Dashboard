import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { HamadHospitalService } from '../hamad-hospital.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    formSlider: FormGroup;
    FormData: FormGroup;
    fileSelected: any;
    @ViewChild('fileUpload') fileUpload: any;
    constructor(
        fb: FormBuilder,
        private _HamadHospitalService: HamadHospitalService,
        private messageService: MessageService,
        private _translateService: TranslateService
    ) {
        this.formSlider = fb.group({
            ID: [''],
            Image: [''],
            TitleAr: [''],
            TitleEn: [''],
            Sorting: [''],
            IsActive: [''],
        });
        this.FormData = fb.group({
            MedicalRehabilitationIconPath: [null],
            MedicalRehabilitationIconDescAr: [null],
            MedicalRehabilitationIconDescEn: [null],
            ProstheticsIconPath: [null],
            ProstheticsDescAr: [null],
            ProstheticsDescEn: [null],
            HearingIconPath: [null],
            HearingDescAr: [null],
            HearingDescEn: [null],
            OutpatientClinicsIconPath: [null],
            OutpatientClinicsDescAr: [null],
            OutpatientClinicsDescEn: [null],
        });
    }

    ngOnInit() {}

    save() {
        // this._HamadHospitalService.saveData(this.formSlider.value);
        console.log('fileUpload', this.fileUpload);
        if (this.formSlider.invalid) {
            this.messageService.add({
                severity: 'error',
                detail: this._translateService.instant(
                    'Shared.THERE_ARE_REQUIRED_FIELDS'
                ),
            });
        } else {
            console.log(this.formSlider.value, 'fffpeoeoeoeo');
            this._HamadHospitalService.saveData({
                ...this.formSlider.value,
                Image: this.fileSelected,
            }).subscribe()
        }
        console.log(this.formSlider.value, 'gegegegeg');
    }
    clear() {}
    checked: boolean | undefined;
}
