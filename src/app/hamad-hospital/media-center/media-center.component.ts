import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MediaCenterService } from './media-center.service';
import { Table } from 'primeng/table';

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
    Avatar=environment.FileUrl;
    isEn = document.dir == 'ltr' ? true : false;
    MainService?:any[];
    MediaSection?:any[];
    constructor(
        private _mediaCenterService: MediaCenterService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private _translateService: TranslateService,
        private renderer: Renderer2
    ) {
        this.Form_MediaSectionsItems = fb.group({
            MediaSectionID: ['', Validators.required ],
            SubTitleAr: [''],
            TitleAr: ['' , Validators.required],
            TitleEn: ['نص'],
            DescAr: [''],
            DescEn: ['نص'],
            MainServiceID: [''],
            VideoPath: [''],
            IsActive: [false],
            ShowHome: [false],
            Sorting: [''],
        });
    }

    ngOnInit(): void {
        this._mediaCenterService.getImageSection();
        this._mediaCenterService.getMediaType();
        this._mediaCenterService.getMediaSectionsItems();
            this.MediaSectionsItems$ =
            this._mediaCenterService.Selector$('MediaSectionsItems');
          this._mediaCenterService.Selector$('MediaSectionsItems').pipe(map((value) => {
            return value?.data?.map((item: any) => {
                return{
                    ...item,
                    MainServiceName:this.MainServiceName(item?.MainServiceID)
                }

            });
          }),
         );

        this.addPhotosDialog$ =
            this._mediaCenterService.Selector$('addPhotosDialog');
            this.MediaType$ = this._mediaCenterService.Selector$('MediaType');
            this.Form_MediaSectionsItems.get("MediaSectionID")?.valueChanges.subscribe(x => {
                console.log('firstname value changed')
                console.log(x)
             })
    }

    save() {
        if(!this.ID){
            if (this.Form_MediaSectionsItems.invalid) {
                this.messageService.add({
                    severity: 'error',
                    detail: this._translateService.instant(
                        ' يوجد حقول مطلوبة '
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

            this._mediaCenterService.saveMediaSectionsItems({
                ...this.Form_MediaSectionsItems.value,
                ImagePath: this.fileSelected,
                ID:this.ID
            });

            this.clear();

        }

    }

    openDialog(item: any) {}
    clear() {
    this.Form_MediaSectionsItems.reset();
    this.Form_MediaSectionsItems.reset();
    this.Form_MediaSectionsItems.get('IsActive')?.patchValue(false)
    this.Form_MediaSectionsItems.get('DescEn')?.patchValue('نص')
    this.Form_MediaSectionsItems.get('TitleEn')?.patchValue('نص')
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

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
    MainServiceName(id:any){
        if(id=== 1){
          return "الاطراف الصناعية"
         }
         if(id=== 2){
          return  "الاطراف الصناعية"
         }
         if(id=== 3){
           return "لسمع والتوازن"
         }
         if(id=== 4){
           return "العيادة الخارجية"
         }
         if(id=== 5){
           return "خدمات طبية مساندة"
         }
         if(id=== 6){
           return "غير مصنف"
         }
         return ''
    }

}
