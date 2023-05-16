import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { MainInfoService } from './main-info.service';

@Component({
    selector: 'app-main-info',
    templateUrl: './main-info.component.html',
    styleUrls: ['./main-info.component.scss'],
})
export class MainInfoComponent implements OnInit {
    formMainInfo: FormGroup;
    formStats: FormGroup;
    fileSelected: any;
    ID: any;
    Stats$!: Observable<any>;
    @ViewChild('fileUpload') fileUpload: any;
    constructor(private _mainInfoService: MainInfoService, fb: FormBuilder  , private messageService: MessageService,
        private _translateService: TranslateService) {
        this.formMainInfo = fb.group({
            HospitalNameAr: ['نص'],
            HospitalNamEn: ['نص'],
            AboutAr: [''],
            AboutEn: ['نص'],
            FacebookLink: [''],
            YoutubeLink: [''],
            InstagramLink: [''],
            TwitterLink: [''],
            WhatsAppLink: [''],
            SocialMediaTag: [''],
            LocationAr: [''],
            LocationEn: ['نص'],
            Mobile: [''],
            Phone: [''],
            Email: [''],
            HomeVariousTitleAr: [''],
            HomeVariousTitleEn: ['نص'],
            BookAppointment: ['نص'],
            LogoImagePath: [''],
        });
        this.formStats = fb.group({
            ID: [''],
            NameAr: ['',Validators.required],
            NameEn: ['نص'],
            Count: [''],
            IsActive: [false],
            Sorting: [''],
        });
    }

    ngOnInit(): void {
        this._mainInfoService.getStats();
        this.Stats$ = this._mainInfoService.Selector$('Stats');
    }
    /*  */
    save() {


        if (this.formMainInfo.invalid) {
            this.messageService.add({
                severity: 'error',
                detail: this._translateService.instant(
                    'الحقول مطلوبة'
                ),
            });
        } else{
            this._mainInfoService.saveMainInfo({
                ...this.formMainInfo.value,
                LogoImagePath: this.fileSelected,
            });
        }


    }

    clear() {
        this.formMainInfo.reset();
    }
    /*  */
    saveStats() {

        if (this.formStats.invalid) {
            this.messageService.add({
                severity: 'error',
                detail: this._translateService.instant(
                    'الحقول مطلوبة'
                ),
            });
        } else{
            this._mainInfoService.saveStats(this.formStats.value);
        this.clearStats();
        }

    }
    clearStats() {
        this.formStats.reset();
    }

    editItem(item?: any) {
        this.formStats.patchValue(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    deleteItem(item?: any) {
        this._mainInfoService.deleteStats(item.ID);
    }
}
