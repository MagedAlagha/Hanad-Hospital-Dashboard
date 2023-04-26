import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HamadHospitalService } from '../hamad-hospital.service';
import { HomeService } from './home.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    formSlider: FormGroup;
    fileSelected: any;
    sliderData$!: Observable<any>;
    ID: any;

    Avatar = environment.FileUrl;
    @ViewChild('fileUpload') fileUpload: any;
    imgResultBeforeCompression: string = '';
    imgResultAfterCompression: string = '';

    constructor(
        fb: FormBuilder,
        private _homeService: HomeService,
        private messageService: MessageService,
        private _translateService: TranslateService
    ) {
        this.formSlider = fb.group({
            ID: [],
            Image: [''],
            TitleAr: ['', Validators.required],
            TitleEn: ['نص'],
            Link: [''],
            Sorting: [''],
            IsActive: [false],
            ShowTitle: [false],
            /* ShowLink: [false], */
        });
    }

    ngOnInit() {
        this._homeService.getSliderData();
        this.sliderData$ = this._homeService.Selector$('sliderData');
    }

    save() {
        console.log('fileUpload', this.fileUpload);
        if (this.formSlider.invalid) {
            this.messageService.add({
                severity: 'error',
                detail: this._translateService.instant('العنوان مطلوب'),
            });
        } else {
            if (this.fileSelected||!this.ID) {
                if (!this.ID) {
                    this._homeService.saveData({
                        ...this.formSlider.value,
                        Image: this.fileSelected,
                    });
                    this.clear();
                } else {
                    this._homeService.saveData({
                        ...this.formSlider.value,
                        Image: this.fileSelected,
                        /*  ID:this.ID */
                    });
                    this.clear();
                }
            } else {
                this.messageService.add({
                    severity: 'error',
                    detail: this._translateService.instant('الصورة مطلوبة '),
                });
            }
        }
        console.log(this.formSlider.value, 'gegegegeg');
    }

    editItem(item: any) {
        this.formSlider.patchValue(item);
        /* this.ID = item.ID; */
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.fileUpload.takeNameReturnFilesSelected([
            item?.ImagePath?.split('/')?.pop(),
        ]);    }
    deleteItem(item: any) {
        this._homeService.deleteSlider(item.ID);
    }
    clear() {
        this.formSlider.reset();
        this.formSlider.get('TitleEn')?.patchValue('نص');
        this.formSlider.get('IsActive')?.patchValue(false);
        this.formSlider.get('ShowTitle')?.patchValue(false);
        this.ID = null;
        this.fileSelected = null;
        this.fileUpload.clear();
    }
}
