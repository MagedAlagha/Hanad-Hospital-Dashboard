import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { HomeService } from '../home.service';
import { Observable, tap } from 'rxjs';

@Component({
    selector: 'app-services-cards',
    templateUrl: './services-cards.component.html',
    styleUrls: ['./services-cards.component.scss'],
})
export class ServicesCardsComponent implements OnInit {
    serviceCardsTable$!:Observable<any>;

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
            MedicalRehabilitationIconPath: [''],
            MedicalRehabilitationDescAr: [''],
            MedicalRehabilitationDescEn:  [''],
            ProstheticsIconPath: [''],
            ProstheticsDescAr: [''],
            ProstheticsDescEn: [''],
            HearingIconPath: [''],
            HearingDescAr: [''],
            HearingDescEn:  [''],
            SupportiveMedicalBackgroundPath: [''],
            SupportiveMedicalDescAr: [''],
            SupportiveMedicalDescEn:  [''],
            OutpatientClinicsIconPath: [''],
            OutpatientClinicsDescAr: [''],
            OutpatientClinicsDescEn:  [''],
        });
    }
    ngOnInit(): void {
       this._homeService.getService();
       this.serviceCardsTable$ = this._homeService.Selector$('serviceCardsTable');

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
            }).subscribe(value=>{
                this._homeService.getService();
            });
        }
    }

    clear() {
        this.formServices.reset();
    }
    editDescription1(item:any){
       this.formServices.get('MedicalRehabilitationDescAr')?.patchValue(item.MedicalRehabilitationDescAr)
       this.formServices.get('MedicalRehabilitationDescEn')?.patchValue(item.MedicalRehabilitationDescEn)
    }
    editDescription2(item:any){
       this.formServices.get('ProstheticsDescAr')?.patchValue(item.ProstheticsDescAr)
       this.formServices.get('ProstheticsDescEn')?.patchValue(item.ProstheticsDescEn)
    }
    editDescription3(item:any){
       this.formServices.get('HearingDescAr')?.patchValue(item.HearingDescAr);
       this.formServices.get('HearingDescEn')?.patchValue(item.HearingDescEn)

    }
    editDescription4(item:any){
       this.formServices.get('OutpatientClinicsDescAr')?.patchValue(item.OutpatientClinicsDescAr)
       this.formServices.get('OutpatientClinicsDescEn')?.patchValue(item.OutpatientClinicsDescEn)
    }
    editDescription5(item:any){
       this.formServices.get('SupportiveMedicalDescAr')?.patchValue(item.SupportiveMedicalDescAr)
       this.formServices.get('SupportiveMedicalDescEn')?.patchValue(item.SupportiveMedicalDescEn)
    }

}
