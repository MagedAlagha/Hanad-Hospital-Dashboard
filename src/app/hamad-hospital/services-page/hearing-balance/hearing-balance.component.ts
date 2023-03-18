import {
    AfterContentChecked,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ServicesPageService } from '../services-page.service';

@Component({
    selector: 'app-hearing-balance',
    templateUrl: './hearing-balance.component.html',
    styleUrls: ['./hearing-balance.component.scss'],
})
export class HearingBalanceComponent implements OnInit {
    formHearingSection!: FormGroup<any>;
    formHearingDepartemt!: FormGroup<any>;
    prosthetics$!: Observable<any>;
    HearingDepartemt$!: Observable<any>;
    fileSelected_2: any;
    fileSelected: any;
    @ViewChild('fileUpload') fileUpload: any;

    constructor(
        fb: FormBuilder,
        private _servicesPageService: ServicesPageService,
        private el: ElementRef
    ) {
        this.formHearingDepartemt = fb.group({
            ID: [],
            IconPath: [],
            NameAr: [],
            NameEn: [],
            DescAr: [],
            DescEn: [],
            IsActive: [],
            Sorting: [],
        });
        this.formHearingSection = fb.group({
            HearingSectionAr: [null],
            HearingSectionEn: [null],
        });
    }

    ngOnInit() {
        this.prosthetics$ = this._servicesPageService.Selector$('prosthetics');
        this.HearingDepartemt$ =
            this._servicesPageService.Selector$('HearingDepartemt');
    }

    saveformHearingDepartemt() {
        this._servicesPageService.saveHearingDepartemt({
            ...this.formHearingDepartemt.value,
            IconPath: this.fileSelected_2,
        });
    }
    clearformHearingDepartemt() {
        this.formHearingDepartemt.reset();
    }

    saveHearingSection() {
        this._servicesPageService.saveHearingSection({
            ...this.formHearingSection.value,
            HearingSectionImagePath: this.fileSelected,
        });
    }

    clear() {}
    editItem(item: any) {
        this.formHearingDepartemt.patchValue(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    deleteItem(item: any) {
        this._servicesPageService.deleteHearingDepartemt(item.ID);
    }
}
