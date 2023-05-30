import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { AdvertisementsService } from './advertisements.service';
import { HomeService } from '../home/home.service';

@Component({
    selector: 'app-advertisements',
    templateUrl: './advertisements.component.html',
    styleUrls: ['./advertisements.component.scss'],
})
export class AdvertisementsComponent implements OnInit {
    formAdvertisements!: FormGroup;
    dataTable$!: Observable<any>;
    ID: any;
    codes$!: Observable<any>;
    constructor(
        private _advertisementsService: AdvertisementsService,
        private messageService: MessageService,
        private _translateService: TranslateService,
        private _homeService:HomeService,
        fb: FormBuilder
    ) {
        this.formAdvertisements = fb.group({
            ID: [],
            TitleAr: ['', Validators.required],
            TitleEn: ['نص'],
            ButtonAdded: [false],
            ButtonTitleAr: ['' ,Validators.required],
            ButtonTitleEn: ['نص'],
            DescriptionAr: [''],
            DescriptionEn: ['نص'],
            ButtonLink: ['',Validators.required],
            CategoryID: [''],
            IsActive: [false ],
            Sorting: [''],
        });
    }

    ngOnInit(): void {
        this._advertisementsService.getAdvertisements();
        this._advertisementsService.getCodes();
        this.dataTable$ = this._advertisementsService.Selector$('dataTable');
        this.codes$ = this._advertisementsService.Selector$('codes')
    }
    save() {

        if (this.formAdvertisements.invalid) {
            this.messageService.add({
                severity: 'error',
                detail: this._translateService.instant(
                    'الحقول مطلوبة'
                ),
            });
        } else{

            if (!this.ID) {
                this._advertisementsService.saveAdvertisements(
                    this.formAdvertisements.value
                );
            } else {
                this._advertisementsService.saveAdvertisements({
                    ...this.formAdvertisements.value,
                    ID: this.ID,
                });
            }

            this.clear();
        }
    }
    clear() {
        this.formAdvertisements.reset();
        this.ID = 0;
        this.formAdvertisements.get('IsActive')?.patchValue(false)
        this.formAdvertisements.get('TitleEn')?.patchValue('نص')
        this.formAdvertisements.get('ButtonTitleEn')?.patchValue('نص')
        this.formAdvertisements.get('DescriptionEn')?.patchValue('نص')
    }

    editItem(items?: any) {
        this.formAdvertisements.patchValue(items);
        this.ID = items.ID;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    deleteItem(items?: any) {
        this._advertisementsService.deleteAdvertisements(items.ID);
    }

    onChange(event:any){

    }


    onRowReorder(event: any, value: any) {
        console.log('event', event);
        console.log('value', value);
        console.log('value', value);
        let newVlue = value?.data.map((element: any, index: any) => {
            return { id: element.ID, sorting: index };
        });
        console.log('newVlue', newVlue);
        this._homeService.RowReorder(newVlue , 'Advertisements').subscribe();
    }



}
