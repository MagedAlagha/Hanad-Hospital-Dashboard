import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { map, Observable, tap } from 'rxjs';
import { MediaCenterService } from './media-center.service';

@Component({
    selector: 'app-media-center',
    templateUrl: './media-center.component.html',
    styleUrls: ['./media-center.component.scss'],
})
export class MediaCenterComponent implements OnInit {
    Form_MediaSectionsItems!: FormGroup;
    fileSelected: any;
    fileSelected2: any;
    fileSelected3: any;
    addPhotosDialog$!: Observable<any>;
    MediaSectionsItems$!: Observable<any>;
    @ViewChild('fileUpload') fileUpload: any;

    constructor(
        private _mediaCenterService: MediaCenterService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private _translateService: TranslateService
    ) {
        this.Form_MediaSectionsItems = fb.group({
            ID: [''],
            MediaSectionID: [''],
            TitleAr: [''],
            TitleEn: [''],
            DescAr: [''],
            DescEn: [''],
            MainServiceID: [''],
            IsActive: [''],
            Sorting: [''],
        });
    }

    ngOnInit(): void {
        this._mediaCenterService.getMediaSectionsItems();
        this.MediaSectionsItems$ =
            this._mediaCenterService.Selector$('MediaSectionsItems');
        this.addPhotosDialog$ =
            this._mediaCenterService.Selector$('addPhotosDialog');
    }

    save() {
        console.log('fileUpload', this.fileUpload);
        if (this.Form_MediaSectionsItems.invalid) {
            this.messageService.add({
                severity: 'error',
                detail: this._translateService.instant(
                    'Shared.THERE_ARE_REQUIRED_FIELDS'
                ),
            });
        } else {
            this._mediaCenterService.saveMediaSectionsItems({
                ...this.Form_MediaSectionsItems.value,
                ImagePath: this.fileSelected,
                VideoPath: this.fileSelected2,
            });

            this.clear();
        }
        console.log(this.Form_MediaSectionsItems.value, 'gegegegeg');
    }

    openDialog(item: any) {}
    clear() {}

    edit(item: any) {
        this.Form_MediaSectionsItems.patchValue(item);
    }
    deleteItem(item: any) {
        this._mediaCenterService.deleteMediaSectionsItems(item.ID);
    }

    addPhotosDialog(item?: any) {
        this._mediaCenterService.displayDialogs('addPhotosDialog', true, item);
    }
}
