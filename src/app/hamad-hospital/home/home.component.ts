import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    Avatar=environment.FileUrl
    @ViewChild('fileUpload') fileUpload: any;
    constructor(
        fb: FormBuilder,
        private _homeService: HomeService,
        private messageService: MessageService,
        private _translateService: TranslateService
    ) {
        this.formSlider = fb.group({
            ID: [],
            Image: [null],
            TitleAr: [null],
            TitleEn: [null],
            Sorting: [null],
            IsActive: [false],
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
                detail: this._translateService.instant(
                    'Shared.THERE_ARE_REQUIRED_FIELDS'
                ),
            });
        } else {
            /* console.log(this.formSlider.value, 'fffpeoeoeoeo'); */
            if (!this.ID) {
                this._homeService.saveData({
                    ...this.formSlider.value,
                    Image: this.fileSelected,
                });
            } else {
                this._homeService.saveData({
                    ...this.formSlider.value,
                    Image: this.fileSelected,
                    ID:this.ID
                });
            }

            this.clear();
        }
        console.log(this.formSlider.value, 'gegegegeg');
    }

    editItem(item: any) {
        this.formSlider.patchValue(item);
        this.ID = item.ID;
        window.scroll(0, 0);

    }
    deleteItem(item: any) {
        this._homeService.deleteSlider(item.ID);

    }
    clear() {
        this.formSlider.reset();
    }
}
