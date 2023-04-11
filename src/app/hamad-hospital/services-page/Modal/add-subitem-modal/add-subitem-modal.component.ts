import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ServicesPageService } from '../../services-page.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-add-subitem-modal',
    templateUrl: './add-subitem-modal.component.html',
    styleUrls: ['./add-subitem-modal.component.scss'],
})
export class AddSubitemModalComponent {
    formSubItemTypes!: FormGroup<any>;
    prostheticsTypes$!: Observable<any>;
    constructor(
        fb: FormBuilder,
        private _servicesPageService: ServicesPageService ,
        private messageService: MessageService,
        private _translateService: TranslateService
    ) {
        this.formSubItemTypes = fb.group({
            ID: [''],
            NameAr: ['' , Validators.required],
            NameEn: ['نص'],
            IsActive: [false],
            Sorting: [''],
            ParentID: [''],
        });
    }
    ngOnInit() {
        console.log('test');

        const data =
            this._servicesPageService.dataStore.addSubitemModalDialog?.data;

        if (data) {
            console.log('data', data);
            this.formSubItemTypes.patchValue({ ParentID: data?.ParentID });
            this.formSubItemTypes.patchValue(data?.dataEdit);
            console.log('formSubItemTypes', this.formSubItemTypes?.value);
        }
    }
    save() {
        if (this.formSubItemTypes.invalid) {
            this.messageService.add({
                severity: 'error',
                detail: this._translateService.instant(
                    ' يوجد حقول مطلوبة '
                ),
            });
        } else{
            this._servicesPageService
            .saveProstheticsTypes({
                ...this.formSubItemTypes.value,
            })
            .subscribe((value) => {
                this.formSubItemTypes.reset();
            });
        }

    }
    clear() {
        this.formSubItemTypes.reset();
        this.formSubItemTypes.get('IsActive')?.patchValue(false);
        this.formSubItemTypes.get('NameEn')?.patchValue('نص');
    }
    editItem(item: any) {
        this.formSubItemTypes.patchValue(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    deleteItem(item: any) {
        this._servicesPageService.deleteProstheticsTypes(item.ID);
    }
    closeDialog() {
        this._servicesPageService.displayDialogs(
            'addSubitemModalDialog',
            false
        );
        this._servicesPageService.getProstheticsTypeselect();
    }
}
