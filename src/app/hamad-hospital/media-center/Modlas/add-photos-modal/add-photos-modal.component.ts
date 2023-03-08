import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MediaCenterService } from '../../media-center.service';

@Component({
  selector: 'app-add-photos-modal',
  templateUrl: './add-photos-modal.component.html',
  styleUrls: ['./add-photos-modal.component.scss']
})
export class AddPhotosModalComponent implements OnInit {
    Form_ImageSection!: FormGroup;
    fileSelected: any;
    data:any;
    @ViewChild('fileUpload') fileUpload: any;


constructor(private _mediaCenterService:MediaCenterService , private fb:FormBuilder){
    this.Form_ImageSection = fb.group({
        Sorting: [],
    });
}

ngOnInit(): void {
    this.data = this._mediaCenterService.dataStore.addPhotosDialog?.data;
    if(this.data){
        this.Form_ImageSection.patchValue(this.data)
    }
}
saveImageSection() {
    this._mediaCenterService.saveImageSection({
        ...this.Form_ImageSection.value,
        ImagePath: this.fileSelected,
        MediaSectionsItemID: this.data.ID
    });
}
clearImageSection() {
    this.Form_ImageSection.reset();
}

    closeDialog() {
        this._mediaCenterService.displayDialogs(
            'addPhotosDialog',
            false
        );
    }

}
