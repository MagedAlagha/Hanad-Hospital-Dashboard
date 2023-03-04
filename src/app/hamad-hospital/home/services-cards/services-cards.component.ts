import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { HomeService } from '../home.service';

@Component({
    selector: 'app-services-cards',
    templateUrl: './services-cards.component.html',
    styleUrls: ['./services-cards.component.scss'],
})
export class ServicesCardsComponent {
    formServices: FormGroup;
    fileSelected_01: any;
    fileSelected_02: any;
    fileSelected_03: any;
    fileSelected_04: any;
    @ViewChild('fileUpload') fileUpload: any;
    constructor(
        private fb: FormBuilder,
        private _homeService: HomeService,
        private messageService: MessageService,
        private _translateService: TranslateService
    ) {
        this.formServices = fb.group({
            MedicalRehabilitationIconPath: [null],
            MedicalRehabilitationDescAr: [null],
            MedicalRehabilitationDescEn: [null],
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

    save() {
        console.log('fileUpload', this.fileUpload);
        if (this.formServices.invalid) {
            this.messageService.add({
                severity: 'error',
                detail: this._translateService.instant(
                    'Shared.THERE_ARE_REQUIRED_FIELDS'
                ),
            });
        } else {
            console.log(this.formServices.value, 'fffpeoeoeoeo');
            this._homeService.updateServices({
                ...this.formServices.value,
                MedicalRehabilitationIconPath: this.fileSelected_01,
                ProstheticsIconPath: this.fileSelected_02,
                HearingIconPath: this.fileSelected_03,
                OutpatientClinicsIconPath: this.fileSelected_04,
            });
            this.clear();
        }
    }

    clear() {
        this.formServices.reset();
    }
}
