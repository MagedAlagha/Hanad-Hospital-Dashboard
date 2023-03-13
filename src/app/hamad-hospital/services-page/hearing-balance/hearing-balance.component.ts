import { AfterContentChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
    prosthetics$!: Observable<any>;
    fileSelected: any;
    @ViewChild('fileUpload') fileUpload: any;


    constructor(
        fb: FormBuilder,
        private _servicesPageService: ServicesPageService,
        private el: ElementRef
    ) {
        this.formHearingSection = fb.group({
            HearingSectionAr: [null],
            HearingSectionEn: [null],
        });
    }

    ngOnInit() {
        this.prosthetics$ = this._servicesPageService.Selector$('prosthetics');
    }

    saveHearingSection() {
        this._servicesPageService.saveHearingSection(
           {
            ...this.formHearingSection.value ,
            HearingSectionImagePath: this.fileSelected,
           }
        );

    }


    clear() {}
    editItem(item: any) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    deleteItem(item: any) {
        this._servicesPageService.deleteprosthetics(item.ID);
    }

}
