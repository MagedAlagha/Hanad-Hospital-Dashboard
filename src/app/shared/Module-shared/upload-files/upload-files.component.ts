import { TooltipModule } from 'primeng/tooltip';
import { TrimSpacesPipe } from './../../pipes/trim-spaces.pipe';
import { TranslationModule } from './../../../i18n/translation.module';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
} from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { UploadFilesService } from './upload-files.service';
import { Observable, forkJoin } from 'rxjs';
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
    selector: 'app-upload-files',
    templateUrl: './upload-files.component.html',
    styleUrls: ['./upload-files.component.scss'],
})
export class UploadFilesComponent implements OnInit {
    @ViewChild('fileUpload') fileUpload: any;
    @Input() classColor: string = 'p-button-primary';
    @Input() disabled: boolean = false;
    @Input() body: any;
    @Input() URL: string = '/upload';
    @Input() isAuto: boolean = false;
    @Input() showFilesUploaded: boolean = false;
    @Output() onSelectFiles = new EventEmitter<any>();
    @Output() afterAutoSave = new EventEmitter<any>();
    uploadedFiles: any[] = [];
    constructor(private _uploadFileService: UploadFilesService) {}

    ngOnInit() {}

    onSelect(event: any) {
        this.uploadedFiles = event.currentFiles;
        this.fileUpload.clear();
        this.onSelectFiles.emit(this.uploadedFiles);
        if (this.isAuto) {
            let arr$: Observable<any>[] = [];
            if (this.uploadedFiles.length) {
                for (let i = 0; i < this.uploadedFiles.length; i++) {
                    arr$.push(
                        this._uploadFileService.saveFile({
                            file: this.uploadedFiles[i],
                            ...this.body,
                        })
                    );
                }
                forkJoin(arr$).subscribe((value) => {
                    this.afterAutoSave.emit();
                    this.uploadedFiles = [];
                });
            }
        }
    }
}
