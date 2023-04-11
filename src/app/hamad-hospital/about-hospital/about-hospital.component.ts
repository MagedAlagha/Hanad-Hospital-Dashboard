import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AboutHospitalService } from './about-hospital.service';

@Component({
    selector: 'app-about-hospital',
    templateUrl: './about-hospital.component.html',
    styleUrls: ['./about-hospital.component.scss'],
})
export class AboutHospitalComponent implements OnInit {
    text2: any;
    Form_AboutHospital!: FormGroup<any>;
    AboutHospital$!: Observable<any>;
    showMessageDialog$!:Observable<any>;


    constructor(
        private fb: FormBuilder,
        private _aboutHospitalService: AboutHospitalService ,
        private messageService: MessageService,
        private _translateService: TranslateService ,
        private renderer: Renderer2
    ) {
        this.Form_AboutHospital = fb.group({
            ID: [],
            NameAr: ['' , Validators.required],
            NameEn: ['نص'],
            DescAr: ['' , Validators.required],
            DescEn: ['نص'],
            IsActive: [false],
            Sorting: [ , Validators.required],
        });
    }
    ngOnInit(): void {
        this._aboutHospitalService.getAboutHospital();
        this.AboutHospital$ =
            this._aboutHospitalService.Selector$('AboutHospital');
            this.showMessageDialog$ =  this._aboutHospitalService.Selector$('showMessageDialog')
    }
    save() {
        if (this.Form_AboutHospital.invalid) {
            this.messageService.add({
                severity: 'error',
                detail: this._translateService.instant(
                    'الحقول مطلوبة'
                ),
            });
        } else{
            this._aboutHospitalService.saveAboutHospital(
                this.Form_AboutHospital.value
            );
            this.clear();
        }
    }
    clear() {
        this.Form_AboutHospital.reset();
        this.Form_AboutHospital.get('IsActive')?.patchValue(false)
    }

    editItem(item?: any) {
        this.Form_AboutHospital.patchValue(item);
        window.scrollTo(0, 0);
        console.log(window.scrollTo(0, 0));


    }
    deleteItem(item?: any) {
        this._aboutHospitalService.deleteAboutHospital(item.ID);
    }
    openDialog(item?: any){
        this._aboutHospitalService.displayDialogs(
            'showMessageDialog',
            true,
            item
        );
    }
}
