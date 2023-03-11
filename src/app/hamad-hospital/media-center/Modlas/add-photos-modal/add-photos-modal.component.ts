import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    Avatar=environment.FileUrl;
    ID:any;
    itmsID:any;
    constructor(
        private _mediaCenterService: MediaCenterService,
        private fb: FormBuilder
    ) {
        this.Form_ImageSection = fb.group({
            Sorting: [],
        });
    }

    ngOnInit(): void {
        this.ImageSection$ = this._mediaCenterService.Selector$('ImageSection');
        this.data = this._mediaCenterService.dataStore.addPhotosDialog?.data;
        if (this.data) {
          /*   this.Form_ImageSection.patchValue(this.data); */
          this.itmsID = this.data.ID;
        }
    }
    saveImageSection() {
        if(!this.ID){
            this._mediaCenterService.saveImageSection({
                ...this.Form_ImageSection.value,
                ImagePath: this.fileSelected,
                MediaSectionsItemID: this.data.ID,
            }).subscribe((value)=> this._mediaCenterService.getImageSection(this.itmsID));
        }else{
            this._mediaCenterService.saveImageSection({
                ...this.Form_ImageSection.value,
                ID:this.ID,
                ImagePath: this.fileSelected,
                MediaSectionsItemID: this.data.ID,
            }).subscribe((value)=> this._mediaCenterService.getImageSection(this.itmsID));
        }

    }
    clearImageSection() {
        this.Form_ImageSection.reset();
    }

    closeDialog() {
        this._mediaCenterService.displayDialogs('addPhotosDialog', false);
    }

    deleteItem(item: any) {
        this._mediaCenterService.deleteImageSection(item.ID).subscribe(value=> this._mediaCenterService.getImageSection(this.itmsID));
    }
    edit(item: any) {
        this.Form_ImageSection.patchValue(item);
        this.ID = item.ID;
    }
}
