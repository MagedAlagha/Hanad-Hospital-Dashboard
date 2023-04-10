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
    fileSelected_05: any;
    fileSelected_bg1: any;
    fileSelected_bg2: any;
    fileSelected_bg3: any;
    fileSelected_bg4: any;
    fileSelected_bg5: any;
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
            MedicalRehabilitationDescEn:  ['نص'],
            ProstheticsIconPath: [null],
            ProstheticsDescAr: [null],
            ProstheticsDescEn: ['نص'],
            HearingIconPath: [null],
            HearingDescAr: [null],
            HearingDescEn:  ['نص'],
            SupportiveMedicalBackgroundPath: [null],
            SupportiveMedicalDescAr: [null],
            SupportiveMedicalDescEn:  ['نص'],
            OutpatientClinicsIconPath: [null],
            OutpatientClinicsDescAr: [null],
            OutpatientClinicsDescEn:  ['نص'],
        });
    }

    save() {
        console.log('fileUpload', this.fileUpload);
        if (this.formServices.invalid) {
            this.messageService.add({
                severity: 'error',
                detail: this._translateService.instant(
                    'يوجد حقول مطلوبة'
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
                MedicalRehabilitationBackgroundPath: this.fileSelected_bg1,
                ProstheticsBackgroundPath: this.fileSelected_bg2,
                HearingBackgroundPath: this.fileSelected_bg3,
                OutpatientClinicsBackgroundPath: this.fileSelected_bg4,
                SupportiveMedicalIconPath: this.fileSelected_05,
                SupportiveMedicalBackgroundPath: this.fileSelected_bg5,
            });
        }
    }

    clear() {
        this.formServices.reset();
        this.formServices.get('MedicalRehabilitationDescEn')?.patchValue('نص')
        this.formServices.get('ProstheticsDescEn')?.patchValue('نص')
        this.formServices.get('HearingDescEn')?.patchValue('نص')
        this.formServices.get('SupportiveMedicalDescEn')?.patchValue('نص')
        this.formServices.get('OutpatientClinicsDescEn')?.patchValue('نص')
    }
}
