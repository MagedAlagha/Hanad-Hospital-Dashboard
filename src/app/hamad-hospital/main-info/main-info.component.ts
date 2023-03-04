import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    constructor(private _mainInfoService: MainInfoService, fb: FormBuilder) {
        this.formMainInfo = fb.group({
            HospitalNameAr: [],
            HospitalNamEn: [],
            AboutAr: [],
            AboutEn: [],
            FacebookLink: [],
            YoutubeLink: [],
            InstagramLink: [],
            TwitterLink: [],
            WhatsAppLink: [],
            SocialMediaTag: [],
            LocationAr: [],
            LocationEn: [],
            Mobile: [],
            Phone: [],
            Email: [],
            LogoImagePath: [],
        });
        this.formStats = fb.group({
            ID: [],
            NameAr: [],
            NameEn: [],
            Count: [],
            IsActive: [],
            Sorting: [],
        });
    }

    ngOnInit(): void {
        this._mainInfoService.getStats();
        this.Stats$ = this._mainInfoService.Selector$('Stats');
    }
    /*  */
    save() {
        this._mainInfoService.saveMainInfo({
            ...this.formMainInfo.value,
            LogoImagePath: this.fileSelected,
        });
    }

    clear() {
        this.formMainInfo.reset();
    }
    /*  */
    saveStats() {
        this._mainInfoService.saveStats(this.formStats.value);
        this.clearStats();
    }
    clearStats() {
        this.formStats.reset();
    }

    editItem(item?: any) {
        this.formStats.patchValue(item);
    }
    deleteItem(item?: any) {
        this._mainInfoService.deleteStats(item.ID);
    }
}
