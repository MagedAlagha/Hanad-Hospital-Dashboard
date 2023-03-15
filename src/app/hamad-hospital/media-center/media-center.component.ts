import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    MediaType$!: Observable<any>;
    itemShow:any;
    ID:any;
    @ViewChild('fileUpload') fileUpload: any;

    constructor(
        private _mediaCenterService: MediaCenterService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private _translateService: TranslateService,
        private renderer: Renderer2
    ) {
        this.Form_MediaSectionsItems = fb.group({
            MediaSectionID: ['' , Validators.required],
            TitleAr: ['', Validators.required],
            TitleEn: ['', Validators.required],
            DescAr: ['', Validators.required],
            DescEn: ['', Validators.required],
            MainServiceID: ['', Validators.required],
            VideoPath: [''],
            IsActive: [false],
            Sorting: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this._mediaCenterService.getImageSection();
        this._mediaCenterService.getMediaType();
        this._mediaCenterService.getMediaSectionsItems();
        this.MediaSectionsItems$ =
            this._mediaCenterService.Selector$('MediaSectionsItems');
        this.addPhotosDialog$ =
            this._mediaCenterService.Selector$('addPhotosDialog');
            this.MediaType$ = this._mediaCenterService.Selector$('MediaType')
    }

    save() {
        if(!this.ID){
            if (this.Form_MediaSectionsItems.invalid) {
                this.messageService.add({
                    severity: 'error',
                    detail: this._translateService.instant(
                        'الحقول مطلوبة'
                    ),
                });
            } else {
                this._mediaCenterService.saveMediaSectionsItems({
                    ...this.Form_MediaSectionsItems.value,
                    ImagePath: this.fileSelected,
                });

                this.clear();
            }
        }else{

            if (this.Form_MediaSectionsItems.invalid) {
                this.messageService.add({
                    severity: 'error',
                    detail: this._translateService.instant(
                        'الحقول مطلوبة'
                    ),
                });
            } else {
                this._mediaCenterService.saveMediaSectionsItems({
                    ...this.Form_MediaSectionsItems.value,
                    ImagePath: this.fileSelected,
                    ID:this.ID
                });

                this.clear();
            }

        }

    }

    openDialog(item: any) {}
    clear() {
    this.Form_MediaSectionsItems.reset();
    }

    edit(item: any) {
        this.Form_MediaSectionsItems.patchValue(item);
        this.ID = item.ID;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    deleteItem(item: any) {
        this._mediaCenterService.deleteMediaSectionsItems(item.ID);
    }

    addPhotosDialog(item?: any) {
        this._mediaCenterService.displayDialogs('addPhotosDialog', true, item);
        this.itemShow = item.ID;
        this._mediaCenterService.getImageSection(item.ID);
    }
}
