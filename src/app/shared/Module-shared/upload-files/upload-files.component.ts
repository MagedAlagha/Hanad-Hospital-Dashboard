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
import { NgxImageCompressService } from 'ngx-image-compress';
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
    providers: [NgxImageCompressService],
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
    @Input() multiple: boolean = false;
    @Input() showFilesUploaded: boolean = false;
    @Output() onSelectFiles = new EventEmitter<any>();
    @Output() afterAutoSave = new EventEmitter<any>();
    uploadedFiles: any[] = [];
    compressedImage: any;
    constructor(
        private _uploadFileService: UploadFilesService,
        private imageCompress: NgxImageCompressService
    ) {}

    ngOnInit() {}
    event($event: any) {
        console.log('$event', $event.target.files);
    }
    onSelect(event: any) {
        console.log('event', event);
        if (this.multiple) {
            this.uploadedFiles = [...this.uploadedFiles, ...event.currentFiles];
            this.onSelectFiles.emit(this.uploadedFiles);
        } else {
            this.uploadedFiles = event.currentFiles;
            this.onSelectFiles.emit(this.uploadedFiles[0]);
        }
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
        /* this.fileUpload.clear(); */
    }
    imgResultBeforeCompression: any;
    compressFile(files: any) {
        let arrTypesImg: any = [
            'apng',
            'avif',
            'gif',
            'jpg',
            'jpeg',
            'jfif',
            'pjpeg',
            'pjp',
            'png',
            'svg',
            'webp',

        ];
        let AllFiles: any = [...files?.target.files];
        let Images: any = [];
        let filesPdf: any = [];
        AllFiles.forEach((file: File) => {
            if (arrTypesImg.includes(file.type)||file.type?.includes('image')) {
                Images.push(file);
            } else {
                filesPdf.push(file);
            }
            console.log("file.type888888888888 " , file.type )

        });
        this.convertFileToBase64(Images).then((value: any) => {
            let Files: any = [];
            value.forEach((item: any, index: any) => {
                this.imgResultBeforeCompression = item?.image;
                this.imageCompress
                    .compressFile(item?.image, item?.orientation, 50, 65)
                    .then((compressedImage) => {
                        this.compressedImage = compressedImage;
                        let file = this.base64ToFile(
                            compressedImage,
                            item?.fileName
                        );
                        Files.push(file);
                    })
                    .then(() => {
                        if (index + 1 == value?.length) {
                            this.onSelect({
                                currentFiles: Files,
                            });
                        }
                    });
            });
        });
        this.onSelect({ currentFiles: filesPdf });
    }

    base64ToFile(data: any, filename: any) {
        const arr = data.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }
    /* dataURItoBlob(dataURI: any) {
        console.log('dataURI',dataURI);

        const byteString = window.atob(dataURI);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: 'image/png' });
        return blob;
    } */
    convertFileToBase64(files: File[]): Promise<any> {
        console.log('files', files);
        return new Promise<any>((resolve, reject) => {
            let result: any = [];
            files.forEach((file: File, index) => {
                const reader: any = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    // const base64String = reader.result.toString().split(',')[1];
                    result.push({
                        image: reader.result,
                        orientation: -1,
                        fileName: file.name,
                    });
                    if (index + 1 == files?.length) {
                        console.log('result', result);
                        resolve(result);
                    }
                };
            });
        });
    }
    clear() {
        this.uploadedFiles = [];
    }
    takeNameReturnFilesSelected(names: any) {
        names.forEach((name: any) => {
            this.uploadedFiles.push({ name: name });
        });
    }
}
