import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AboutHospitalService } from './about-hospital.service';
import { ViewportScroller , DOCUMENT } from '@angular/common';
import { HomeService } from '../home/home.service';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-about-hospital',
    templateUrl: './about-hospital.component.html',
    styleUrls: ['./about-hospital.component.scss'],
})
export class AboutHospitalComponent implements OnInit {
    public Editor = ClassicEditorBuild;
    text2: any;
    Form_AboutHospital!: FormGroup<any>;
    AboutHospital$!: Observable<any>;
    showMessageDialog$!:Observable<any>;

    constructor(
        private fb: FormBuilder,
        private _aboutHospitalService: AboutHospitalService ,
        private messageService: MessageService,
        private _translateService: TranslateService ,
        private  _viewportScroller: ViewportScroller ,
        private _homeService:HomeService

    ) {
        this.Form_AboutHospital = fb.group({
            ID: [],
            NameAr: ['' , Validators.required],
            NameEn: ['', Validators.required],
            DescAr: ['' , Validators.required],
            DescEn: ['', Validators.required],
            IsActive: [false],
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
        if (this.Form_AboutHospital.invalid) {
            this.messageService.add({
                severity: 'error',
                detail: this._translateService.instant(
                    'الحقول مطلوبة'
                ),
            });
        } else{
            this._aboutHospitalService.saveAboutHospital(
                this.Form_AboutHospital.value
            );
            this.clear();
        }
    }
    clear() {
        this.Form_AboutHospital.reset();
        this.Form_AboutHospital.get('IsActive')?.patchValue(false)
    }

    editItem(item?: any) {

        this.Form_AboutHospital.patchValue(item);
      /*   window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); */

      window.scrollTo(10, 10);

/*         this._viewportScroller.scrollToPosition([0, 0])
 */
console.log('fsfsfeg')

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


    onRowReorder(event: any, value: any) {
        console.log('event', event);
        console.log('value', value);
        console.log('value', value);
        let newVlue = value?.data.map((element: any, index: any) => {
            return { id: element.ID, sorting: index };
        });
        console.log('newVlue', newVlue);
        this._homeService.RowReorder(newVlue , 'AboutHospitalPoints').subscribe((res: any) => {
            if (res.rv > 0) {
                this._homeService.getSliderData();
            }
        });
    }



}
