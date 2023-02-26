import { TextAreaFieldComponent } from 'src/app/shared/Module-shared/text-area-field/text-area-field.component';
import { Observable, share } from 'rxjs';
import { AttachmentsService } from './attachments.service';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { TranslationModule } from '../../../i18n/translation.module';
import { SelectFieldComponent } from 'src/app/shared/Module-shared/select-field/select-field.component';
import { InputNumberFieldComponent } from 'src/app/shared/Module-shared/input-number-field/input-number-field.component';
import { InputFieldComponent } from 'src/app/shared/Module-shared/input-field/input-field.component';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DialogSharedComponent } from 'src/app/shared/Module-shared/dialog-shared/dialog-shared.component';
import { TableModule } from 'primeng/table';
import { ButtonComponentComponent } from 'src/app/shared/Module-shared/button-component/button-component.component';
import { SearchFieldComponent } from 'src/app/shared/Module-shared/search-field/search-field.component';
import { IconSharedComponent } from 'src/app/shared/Module-shared/icon-shared/icon-shared.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IconSharedComponent,
        TableModule,
        SearchFieldComponent,
        ButtonComponentComponent,
        DialogSharedComponent,
        InputFieldComponent,
        SelectFieldComponent,
        TranslationModule,
        FileUploadModule,
        TextAreaFieldComponent,
    ],
    selector: 'app-attachements',
    templateUrl: './attachements.component.html',
    styleUrls: ['./attachements.component.scss'],
})
export class AttachementsComponent implements OnInit {
    display: boolean = false;
    AttachementsForm: FormGroup;
    data: any[] = ['1', '2', '3'];
    uploadedFiles: any[] = [];
    codes$!: Observable<any>;
    attachement$!: Observable<any>;
    @Input() canNotAdd: any;

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private _attachmentsService: AttachmentsService
    ) {
        this.AttachementsForm = this.fb.group({
            FileType: [null],
            // BrowseFile: [null],
            FileDesc: [null],
        });
    }

    ngOnInit() {
        this._attachmentsService.getCodes();
        this.codes$ = this._attachmentsService.codes$;
        this.getFiles()
    }
    getFiles() {
        this.attachement$ = this._attachmentsService.getFile().pipe(share());
    }
    save() {
        this._attachmentsService
            .addFile({
                File: this.uploadedFiles,
                ...this.AttachementsForm.value,
            })
            .subscribe((value) => {
                this.AttachementsForm.reset();
                this.getFiles();
            });
    }
    deleteFile(ID: any) {
        this._attachmentsService.deleteFile({ ID: ID }).subscribe((value) => {
            this.getFiles();
        });
    }
    DownloadFile(url: any) {
        window.open(environment.FileUrl + url, '_blank');
    }
    onSelect(event: any) {
        this.uploadedFiles = event.currentFiles;
    }
}
