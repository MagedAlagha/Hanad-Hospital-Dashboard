import { filter } from 'rxjs/operators';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MediaCenterService } from './media-center.service';
import { Table } from 'primeng/table';
import { UploadFilesComponent } from 'src/app/shared/Module-shared/upload-files/upload-files.component';
import { HomeService } from '../home/home.service';

@Component({
    selector: 'app-media-center',
    templateUrl: './media-center.component.html',
    styleUrls: ['./media-center.component.scss'],
})
export class MediaCenterComponent implements OnInit {
    MainServiceID = new FormControl();
    MediaSectionID = new FormControl();
    Form_MediaSectionsItems!: FormGroup;
    fileSelected: any;
    fileSelected2: any;
    addPhotosDialog$!: Observable<any>;
    MediaSectionsItems$!: Observable<any>;
    MediaType$!: Observable<any>;
    itemShow: any;
    ID: any;
    Form_ImageSection!: FormGroup;

    @ViewChild('fileUpload') fileUpload!: UploadFilesComponent;
    @ViewChild('fileUploadD') fileUploadD!: UploadFilesComponent;
    Avatar = environment.FileUrl;
    isEn = document.dir == 'ltr' ? true : false;
    MainService?: any[];
    MediaSection?: any[];
    MediaSectionsItems: any;
    MediaSectionsItemsWithoutFilter: any;
    listSections = [
        { Code: 1, Name: 'الأخبار', value: false },
        { Code: 2, Name: 'معرض الصور', value: false },
        { Code: 3, Name: 'معرض الفيديو', value: false },
        { Code: 4, Name: 'تثقيف صحي وتوعية', value: false },
        { Code: 5, Name: 'قصص صحفية', value: false },
        { Code: 6, Name: 'قصص رقمية', value: false },
        { Code: 7, Name: 'منوعات', value: false },
        { Code: 8, Name: 'النشرة الإخبارية', value: false },
    ];
    constructor(
        private _mediaCenterService: MediaCenterService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private _translateService: TranslateService,
        private _homeService: HomeService
    ) {
        this.Form_MediaSectionsItems = fb.group({
            MediaSectionID: ['', Validators.required],
            SubTitleAr: [''],
            TitleAr: ['', Validators.required],
            TitleEn: ['نص'],
            DescAr: [''],
            DescEn: [' نص'],
            MainServiceID: [''],
            VideoPath: [''],
            ItemDate: [''],
            IsActive: [false],
            ShowHome: [false],
            ShowVarious: [false],
            Sorting: [null],
        });

        this.Form_ImageSection = fb.group({
            Sorting: [''],
        });
    }

    ngOnInit(): void {
        this._mediaCenterService.getImageSection();
        this._mediaCenterService.getMediaType();
        this._mediaCenterService.getMediaSectionsItems();

        this.MediaSectionsItems$ = this._mediaCenterService
            .Selector$('MediaSectionsItems')
            .pipe(
                map((value) => {
                    return {
                        ...value,
                        data: value?.data?.map((item: any) => {
                            return {
                                ...item,
                                MainServiceName: this.MainServiceName(
                                    item?.MainServiceID
                                ),
                            };
                        }),
                    };
                }),
                map((value) => {
                    return {
                        ...value,
                        data: value?.data?.map((item: any) => {
                            return {
                                ...item,
                                MediaSectionName: this.MediaSectionName(
                                    item?.MediaSectionID
                                ),
                            };
                        }),
                    };
                }),
                tap((value: any) => {
                    console.log('valueeee', value);
                    this.MediaSectionsItemsWithoutFilter = value?.data;
                    this.MediaSectionsItems = value?.data;
                    this.filterbySection();
                    this.filterbyServices();
                    /*  value.data.reverse(); */
                })
            );

        this.addPhotosDialog$ =
            this._mediaCenterService.Selector$('addPhotosDialog');
        this.MediaType$ = this._mediaCenterService.Selector$('MediaType');
    }

    save() {
        if (!this.ID) {
            if (this.Form_MediaSectionsItems.invalid) {
                this.messageService.add({
                    severity: 'error',
                    detail: this._translateService.instant(
                        ' حقل العنوان مطلوب '
                    ),
                });
            } else {
                if (
                    this.Form_MediaSectionsItems.get(
                        'MediaSectionID'
                    )?.value?.includes('3') &&
                    !this.Form_MediaSectionsItems.get('VideoPath')?.value
                ) {
                    this.messageService.add({
                        severity: 'error',
                        detail: this._translateService.instant(
                            ' الرجاء ادخال رابط الفيديو  '
                        ),
                    });
                } else {
                    this._mediaCenterService
                        .saveMediaSectionsItems({
                            ...this.Form_MediaSectionsItems.value,
                            ImagePath: this.fileSelected,
                        })
                        .subscribe((value: any) => {
                            this.saveImageSection(value?.rv);
                            this.clear();
                        });
                }
            }
        } else {
            console.log(this.fileSelected);
            this._mediaCenterService
                .saveMediaSectionsItems({
                    ...this.Form_MediaSectionsItems.value,
                    ImagePath: this.fileSelected,
                    ID: this.ID,
                })
                .subscribe((value: any) => {
                    if(value){
                        this.saveImageSection(value?.rv);

                    }
                    this.clear();
                });
        }

        /*   if(this.Form_MediaSectionsItems.value.MediaSectionID.includes('3')){
            this.Form_MediaSectionsItems.get('VideoPath')?.setValidators(Validators.required) ;
            if(this.Form_MediaSectionsItems.get('VideoPath')?.value == ''){
                this.messageService.add({
                    severity: 'error',
                    detail: this._translateService.instant('يرجى ادخال رابط فيديو اليوتيوب '),
                });
            }
        } */
    }

    openDialog(item: any) {}
    clear() {
        this.Form_MediaSectionsItems.reset();
        this.Form_MediaSectionsItems.reset();
        this.Form_MediaSectionsItems.get('IsActive')?.patchValue(false);
        this.Form_MediaSectionsItems.get('ShowHome')?.patchValue(false);
        this.Form_MediaSectionsItems.get('ShowVarious')?.patchValue(false);
        this.Form_MediaSectionsItems.get('DescEn')?.patchValue(' نص');
        this.Form_MediaSectionsItems.get('TitleEn')?.patchValue('نص ');
        this.ID = null;
        this.fileSelected = null;
        this.fileUpload.clear();
    }

    edit(item: any) {
        this.clear();
        this.Form_MediaSectionsItems.patchValue(item);
        this.fileUpload.takeNameReturnFilesSelected([
            item?.ImagePath?.split('/')?.pop(),
        ]);
        this.ID = item.ID;
        this.ShowHome(item?.ShowHome);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    deleteItem(item: any) {
        this._mediaCenterService.deleteMediaSectionsItems(item.ID);
    }

    /* ********************************************************** */

    saveImageSection(ID: any) {
        if(this.fileSelected2?.length){
            this._mediaCenterService
            .saveImageSection(
                {
                    ...this.Form_ImageSection.value,
                    ImagePath: this.fileSelected2,
                    MediaSectionsItemID: ID,
                },
                'true'
            )
            .subscribe((VALUE) => {
                this.fileUploadD.clear();
            });
        }

    }

    clearImageSection() {
        this.Form_ImageSection.reset();
        this.fileUpload.clear();
        this.ID = null;
    }

    /* ********************************************************** */

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

    MediaSectionName(id: any) {
        let arr = [];
        if (id?.includes(1)) {
            arr.push('الأخبار');
        }
        if (id?.includes(2)) {
            arr.push('معرض الصور');
        }
        if (id?.includes(3)) {
            arr.push('معرض الفيديو');
        }
        if (id?.includes(4)) {
            arr.push('تثقيف صحي وتوعية');
        }
        if (id?.includes(5)) {
            arr.push('قصص صحفية');
        }
        if (id?.includes(6)) {
            arr.push('قصص رقمية');
        }
        if (id?.includes(7)) {
            arr.push('منوعات');
        }
        if (id?.includes(8)) {
            arr.push('النشرة الإخبارية');
        }
        return arr.join(',');
    }

    MainServiceName(id: any) {
        console.log(1);
        if (id == 1) {
            return 'التأهيل الطبي';
        }
        if (id == 2) {
            return 'الاطراف الصناعية';
        }
        if (id == 3) {
            return 'السمع والتوازن';
        }
        if (id == 4) {
            return 'العيادة الخارجية';
        }
        if (id == 5) {
            return 'خدمات طبية مساندة';
        }
        if (id == 6) {
            return 'غير مصنف';
        }
        return '';
    }
    filterbySection() {
        if (this.MediaSectionID?.value) {
            this.MainServiceID.reset();
            this.MediaSectionsItems =
                this.MediaSectionsItemsWithoutFilter.filter((value: any) =>
                    value?.MediaSectionID?.includes(this.MediaSectionID?.value)
                );
        } else {
            this.MediaSectionsItems = this.MediaSectionsItemsWithoutFilter;
        }
    }
    filterbyServices() {
        if (this.MainServiceID?.value) {
            this.MediaSectionID.reset();
            this.MediaSectionsItems =
                this.MediaSectionsItemsWithoutFilter.filter(
                    (value: any) =>
                        value?.MainServiceID == this.MainServiceID?.value
                );
        } else {
            this.MediaSectionsItems = this.MediaSectionsItemsWithoutFilter;
        }
    }
    ShowHome(event: any) {
        if (event) {
            this.Form_MediaSectionsItems.get('VideoPath')?.disable();
        } else {
            this.Form_MediaSectionsItems.get('VideoPath')?.enable();
        }
    }

    onRowReorder(event: any, value: any) {
        console.log('event', event);
        console.log('value', value);
        console.log('value', value);
        let newVlue = value?.data.map((element: any, index: any) => {
            return { id: element.ID, sorting: index };
        });
        console.log('newVlue', newVlue);
        this._homeService
            .RowReorder(newVlue, 'MediaSectionsItems')
            .subscribe((res: any) => {
                if (res.rv > 0) {
                    this._homeService.getSliderData();
                }
            });
    }
}
