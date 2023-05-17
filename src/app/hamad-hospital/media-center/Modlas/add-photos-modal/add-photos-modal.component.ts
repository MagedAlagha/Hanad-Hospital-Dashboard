import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MediaCenterService } from '../../media-center.service';

@Component({
    selector: 'app-add-photos-modal',
    templateUrl: './add-photos-modal.component.html',
    styleUrls: ['./add-photos-modal.component.scss'],
})
export class AddPhotosModalComponent implements OnInit {
    Form_ImageSection!: FormGroup;
    fileSelected: any;
    ImageSection$!: Observable<any>;
    data: any;
    @ViewChild('fileUpload') fileUpload: any;
    Avatar = environment.FileUrl;
    ID: any;
    itmsID: any;
    constructor(
        private _mediaCenterService: MediaCenterService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private _translateService: TranslateService
    ) {
        this.Form_ImageSection = fb.group({
            Sorting: [''],
        });
    }

    ngOnInit(): void {
        this.ImageSection$ = this._mediaCenterService.Selector$('ImageSection');
        this.data = this._mediaCenterService.dataStore.addPhotosDialog?.data;
        if (this.data) {
              /*  this.Form_ImageSection.patchValue(this.data); */
               this.itmsID = this.data.ID;

        }
    }
    saveImageSection() {
        if(!this.ID){
            if (this.Form_ImageSection.invalid) {
                this.messageService.add({
                    severity: 'error',
                    detail: this._translateService.instant('الحقول مطلوبة'),
                });
            } else {
                this._mediaCenterService
                    .saveImageSection({
                        ...this.Form_ImageSection.value,
                        ImagePath: this.fileSelected,
                        MediaSectionsItemID: this.data.ID,
                    })
                    .subscribe((value) =>
                        this._mediaCenterService.getImageSection(this.itmsID)
                    );

                this.clearImageSection();
            }
        }else{
            if (this.Form_ImageSection.invalid) {
                this.messageService.add({
                    severity: 'error',
                    detail: this._translateService.instant('الحقول مطلوبة'),
                });
            } else {
                this._mediaCenterService
                    .saveImageSection({
                        ...this.Form_ImageSection.value,
                        ImagePath: this.fileSelected,
                        MediaSectionsItemID: this.data.ID,
                    })
                    .subscribe((value) =>
                        this._mediaCenterService.getImageSection(this.itmsID)
                    );

                this.clearImageSection();
            }
        }
    }
    clearImageSection() {
        this.Form_ImageSection.reset();
        this.fileUpload.clear();
        this.ID = null;
    }

    closeDialog() {
        this._mediaCenterService.displayDialogs('addPhotosDialog', false);
    }

    deleteItem(item: any) {
        this._mediaCenterService
            .deleteImageSection(item.ID)
            .subscribe((value) =>
                this._mediaCenterService.getImageSection(this.itmsID)
            );
    }
    edit(item: any) {
        this.Form_ImageSection.patchValue(item);
        this.ID = item.ID;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
