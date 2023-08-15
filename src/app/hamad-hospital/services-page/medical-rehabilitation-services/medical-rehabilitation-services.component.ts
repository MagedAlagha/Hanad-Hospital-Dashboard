import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { ServicesPageService } from '../services-page.service';
import { HomeService } from '../../home/home.service';

@Component({
  selector: 'app-medical-rehabilitation-services',
  templateUrl: './medical-rehabilitation-services.component.html',
  styleUrls: ['./medical-rehabilitation-services.component.scss']
})
export class MedicalRehabilitationServicesComponent implements OnInit {
    prosthetics$!: Observable<any>;
    getOutpatientClinicsDepartments$!: Observable<any>;
    formOutpatient!: FormGroup;
    fileSelected: any;
    ID:any;
    isEn = document.dir == 'ltr' ? true : false;
    fileSelected_2: any;

    @ViewChild('fileUpload') fileUpload: any;
    constructor(
        fb: FormBuilder,
        private _servicesPageService: ServicesPageService ,
        private messageService: MessageService,
        private _translateService: TranslateService ,
        private _homeService: HomeService

    ) {
        this.formOutpatient = fb.group({
            ID: [],
            IconPath: [],
            NameAr: [null , Validators.required],
            NameEn: [null , Validators.required],
            DescAr: ['نص'],
            DescEn: ['نص'],
            IsActive: [false],
            Sorting: [],
            TypeID: [1],
        });

    }

    ngOnInit() {
        this.prosthetics$ = this._servicesPageService.Selector$('prosthetics');
        this.getOutpatientClinicsDepartments$ = this._servicesPageService.Selector$('OutpatientClinicsDepartments').pipe(
            map((val) => {
              return val?.data?.filter((item: any) => {
                return item.TypeID == 1;
              });
            })
          );

    }

    saveFormOutpatient() {

        if (this.formOutpatient.invalid) {
            this.messageService.add({
                severity: 'error',
                detail: this._translateService.instant(
                    ' حقل الاسم مطلوب  '
                ),
            });
        } else{
            console.log("this.fileSelected" , this.fileSelected_2) ;
        if(!this.ID){
        this._servicesPageService.saveOutpatientClinicsDepartments({
            ...this.formOutpatient.value,
        });
       }else{
        this._servicesPageService.saveOutpatientClinicsDepartments({
            ...this.formOutpatient.value,
            ID:this.ID
        });
       }
       this.clear();
        }
    }

    clear(){
      this.formOutpatient.reset()
      this.formOutpatient.get('TypeID')?.patchValue(1);
      this.formOutpatient.get('IsActive')?.patchValue(false);
      this.formOutpatient.get('NameAr')?.patchValue('');
      this.formOutpatient.get('NameEn')?.patchValue('');
      this.formOutpatient.get('DescEn')?.patchValue('نص');
      this.formOutpatient.get('DescAr')?.patchValue('نص');
      this.ID = null;
    }

    editItem(item: any) {
      this.formOutpatient.patchValue(item);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    deleteItem(item: any) {
        this._servicesPageService.deleteOutpatientClinicsDepartments(item.ID);
    }






    onRowReorder(event: any, value: any) {
        let newVlue = value?.map((value:any)=>{return{...value}}).reverse().map((element: any, index: any) => {
            return { id: element.ID, sorting: index };
        });
        console.log('newVlue', newVlue);
        this._homeService.RowReorder(newVlue , 'OutpatientClinicsDepartments').subscribe();
    }



    addDescription(item?: any){
            this._servicesPageService.displayDialogs(
                'prostheticsTypesDialog',
                true,
                item
            );
        console.log("item :" , item)
    }

}
