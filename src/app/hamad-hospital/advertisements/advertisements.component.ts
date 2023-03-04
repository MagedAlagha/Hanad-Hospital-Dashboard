import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AdvertisementsService } from './advertisements.service';

@Component({
    selector: 'app-advertisements',
    templateUrl: './advertisements.component.html',
    styleUrls: ['./advertisements.component.scss'],
})
export class AdvertisementsComponent implements OnInit {
    formAdvertisements!: FormGroup;
    dataTable$!: Observable<any>;
    ID: any;
    constructor(
        private _advertisementsService: AdvertisementsService,
        fb: FormBuilder
    ) {
        this.formAdvertisements = fb.group({
            ID: [],
            TitleAr: [],
            TitleEn: [],
            ButtonAdded: [true],
            ButtonTitleAr: [],
            ButtonTitleEn: [],
            ButtonLink: [],
            IsActive: [false],
            Sorting: [],
        });
    }

    ngOnInit(): void {
        this._advertisementsService.getAdvertisements();
        this.dataTable$ = this._advertisementsService.Selector$('dataTable');
    }
    save() {
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
    }
    clear() {
        this.formAdvertisements.reset();
        this.ID = 0;
    }

    editItem(items?: any) {
        this.formAdvertisements.patchValue(items);
        this.ID = items.ID;
        window.scroll(0, 0);
    }
    deleteItem(items?: any) {
        this._advertisementsService.deleteAdvertisements(items.ID);
    }
}
