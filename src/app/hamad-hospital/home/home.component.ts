import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HomeService } from './home.service';
import { UploadFilesComponent } from 'src/app/shared/Module-shared/upload-files/upload-files.component';

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
    color1!: string;
    color:any;
    Avatar = environment.FileUrl;
    @ViewChild('fileUpload') fileUpload!: UploadFilesComponent;

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
            TitleEn: [''],
            Link: [''],
            TitleBackgroundColor: [''],
            Sorting: [''],
            IsActive: [false],
            ShowTitle: [false],
            /* ShowLink: [false], */
        });
    }

    ngOnInit() {
        this._homeService.getSliderData();
        this.sliderData$ = this._homeService.Selector$('sliderData')

       /*  .pipe(tap(value=>{
            console.log("value : ", value)
            value.data.reverse()
        })); */
    }

    save() {
        if (this.formSlider.invalid) {
            this.messageService.add({
                severity: 'error',
                detail: this._translateService.instant('العنوان مطلوب'),
            });
        } else {
            if (this.fileSelected || this.ID) {
                    this._homeService.saveData({
                        ...this.formSlider.value,
                        Image: this.fileSelected,
                        TitleBackgroundColor:this.color
                    });
                    this.clear();

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
        this.clear();
        this.formSlider.patchValue(item);
        this.formSlider.get('TitleBackgroundColor')?.patchValue(item.TitleBackgroundColor)
        this.color = item.TitleBackgroundColor;
        this.ID = item.ID;
        console.log('1111111', item.TitleBackgroundColor)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.fileUpload.takeNameReturnFilesSelected([
            item?.ImagePath?.split('/')?.pop(),
        ]);
    }

    deleteItem(item: any) {
        this._homeService.deleteSlider(item.ID);
    }

    clear() {
        this.formSlider.reset();
        this.formSlider.get('IsActive')?.patchValue(false);
        this.formSlider.get('ShowTitle')?.patchValue(false);
        this.ID = null;
        this.fileSelected = null;
        this.fileUpload.clear();
    }

    onRowReorder(event: any, value: any) {
        let newVlue = value?.data.map((value:any)=>{return{...value}}).reverse().map((element: any, index: any) => {
            return { id: element.ID, sorting: index };
        });

        this._homeService.RowReorder(newVlue , 'HeaderSlider').subscribe((res: any) => {
            if (res.rv > 0) {
                this._homeService.getSliderData();
            }
        });
    }
}
