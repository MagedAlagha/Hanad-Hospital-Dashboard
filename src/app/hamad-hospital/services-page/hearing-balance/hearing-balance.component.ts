import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ServicesPageService } from '../services-page.service';

@Component({
  selector: 'app-hearing-balance',
  templateUrl: './hearing-balance.component.html',
  styleUrls: ['./hearing-balance.component.scss']
})
export class HearingBalanceComponent {
    formHearingSectionAr!: FormGroup<any>;
    formHearingSectionEn!: FormGroup<any>;
    prosthetics$!: Observable<any>;

    constructor(
        fb: FormBuilder,
        private _servicesPageService: ServicesPageService
    ) {
        this.formHearingSectionAr = fb.group({
            hearingSectionAr: [null],
        });
        this.formHearingSectionEn = fb.group({
            hearingSectionEn: [null],
        });
    }

    ngOnInit() {
        this.prosthetics$ = this._servicesPageService.Selector$('prosthetics');
    }


    saveHearingSectionEn(){
    this._servicesPageService.saveHearingSectionEn(this.formHearingSectionEn.value);
    this.formHearingSectionEn.reset();
    }

    saveHearingSectionAr(){
        this._servicesPageService.saveHearingSectionAr(this.formHearingSectionAr.value);
        this.formHearingSectionAr.reset();
    }

    clear() {}
    editItem(item: any) {
        window.scroll(0, 0);
    }
    deleteItem(item: any) {
        this._servicesPageService.deleteprosthetics(item.ID);
    }
/* setStyleForImg(){
    debugger
} */

}
