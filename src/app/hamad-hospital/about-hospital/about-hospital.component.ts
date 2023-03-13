import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AboutHospitalService } from './about-hospital.service';

@Component({
    selector: 'app-about-hospital',
    templateUrl: './about-hospital.component.html',
    styleUrls: ['./about-hospital.component.scss'],
})
export class AboutHospitalComponent implements OnInit {
    text2: any;
    Form_AboutHospital!: FormGroup<any>;
    AboutHospital$!: Observable<any>;
    showMessageDialog$!:Observable<any>;


    constructor(
        private fb: FormBuilder,
        private _aboutHospitalService: AboutHospitalService
    ) {
        this.Form_AboutHospital = fb.group({
            ID: [],
            NameAr: [''],
            NameEn: [''],
            DescAr: [''],
            DescEn: [''],
            IsActive: [],
            Sorting: [],
        });
    }
    ngOnInit(): void {
        this._aboutHospitalService.getAboutHospital();
        this.AboutHospital$ =
            this._aboutHospitalService.Selector$('AboutHospital');
            this.showMessageDialog$ =  this._aboutHospitalService.Selector$('showMessageDialog')
    }
    save() {
        this._aboutHospitalService.saveAboutHospital(
            this.Form_AboutHospital.value
        );
    }
    clear() {
        this.Form_AboutHospital.reset();
    }

    editItem(item?: any) {
        this.Form_AboutHospital.patchValue(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    deleteItem(item?: any) {
        this._aboutHospitalService.deleteAboutHospital(item.ID);
    }
    openDialog(item?: any){
        this._aboutHospitalService.displayDialogs(
            'showMessageDialog',
            true,
            item
        );
    }
}
