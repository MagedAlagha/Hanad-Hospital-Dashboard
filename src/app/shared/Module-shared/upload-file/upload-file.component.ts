import { UploadFileService } from './upload-file.service';
import { TooltipModule } from 'primeng/tooltip';
import { TrimSpacesPipe } from './../../pipes/trim-spaces.pipe';
import { TranslationModule } from './../../../i18n/translation.module';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
@Component({
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        TranslationModule,
        TrimSpacesPipe,
        TooltipModule,
        FileUploadModule,
    ],
    selector: 'app-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
    @Input() classColor: string = 'p-button-primary';
    @Input() disabled: boolean = false;
    @Input() body: any;
    @Input() URL: string = '';
    @Output() afterSave = new EventEmitter<any>();
    uploadedFiles: any[] = [];
    constructor(private _uploadFileService: UploadFileService) {}

    ngOnInit() {}

    onSelect(event: any) {
        console.log('onSelect', event);
        this.uploadedFiles = event.currentFiles;
    }
    onUpload(event: any) {
        console.log('onUpload', event);
        if (this.uploadedFiles.length) {
            for (let i = 0; i < this.uploadedFiles.length; i++) {
                this._uploadFileService
                    .saveFile({
                        file: this.uploadedFiles[i],
                        ...this.body,
                    })
                    .subscribe((value) => {
                        this.afterSave.emit();
                        this.uploadedFiles = [];
                    });
            }
        }
    }
}
