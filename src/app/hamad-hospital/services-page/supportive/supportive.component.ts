import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ServicesPageService } from '../services-page.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-supportive',
  templateUrl: './supportive.component.html',
  styleUrls: ['./supportive.component.scss']
})
export class SupportiveComponent {
    prosthetics$!: Observable<any>;
    getOutpatientClinicsDepartments$!: Observable<any>;
    OutpatientClinicsDepartmentsServices$!: Observable<any>;
    formOutpatient!: FormGroup;
    formSections!: FormGroup;
    fileSelected: any;
    ID:any;
    Services_ID:any;
    isEn = document.dir == 'ltr' ? true : false;
    fileSelected_2: any;

    @ViewChild('fileUpload') fileUpload: any;
    constructor(
        fb: FormBuilder,
        private _servicesPageService: ServicesPageService ,
        private messageService: MessageService,
        private _translateService: TranslateService
    ) {
        this.formOutpatient = fb.group({
            ID: [],
            IconPath: [],
            NameAr: ['' , Validators.required],
            NameEn:['نص'],
            DescAr: ['نص'],
            DescEn: ['نص'],
            IsActive: [false],
            Sorting: [],
            TypeID: [5],
        });
        this.formSections = fb.group({
            ID: [],
            NameAr: ['' , Validators.required],
            NameEn: ['نص'],
            DescAr: ['' , Validators.required],
            DescEn:['نص'],
            OutpatientClinicsDepartmentID: [null , Validators.required],
            IsActive: [false],
            Sorting: [],
            TypeID: [5],
        })


    }

    ngOnInit() {
        this.prosthetics$ = this._servicesPageService.Selector$('prosthetics');
        this.getOutpatientClinicsDepartments$ = this._servicesPageService.Selector$('OutpatientClinicsDepartments').pipe(
            map((val) => {
              return val?.data?.filter((item: any) => {
                return item.TypeID == 5;
              });
            })
          );

          this.OutpatientClinicsDepartmentsServices$ = this._servicesPageService.Selector$('OutpatientClinicsDepartmentsServices').pipe(
            map((val) => {
              return val?.data?.filter((item: any) => {
                return item.TypeID == 5;
              });
            })
          );
            }



    saveFormOutpatient() {



        if (this.formOutpatient.invalid) {
            this.messageService.add({
                severity: 'error',
                detail: this._translateService.instant(
                    ' يوجد حقول مطلوبة '
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
     this.formOutpatient.reset();
     this.formOutpatient.get('TypeID')?.patchValue(5);
        this.formOutpatient.get('IsActive')?.patchValue(false);
        this.formOutpatient.get('NameEn')?.patchValue('نص')
        this.formOutpatient.get('DescAr')?.patchValue('نص')
        this.formOutpatient.get('DescEn')?.patchValue('نص')
        this.ID = null;
    }

    clearFormOutpatient() {
    this.formOutpatient.reset();
    }
    editItem(item: any) {
      this.formOutpatient.patchValue(item);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    deleteItem(item: any) {
        this._servicesPageService.deleteOutpatientClinicsDepartments(item.ID)
    }

    saveFormSections(){
        if (this.formSections.invalid) {
            this.messageService.add({
                severity: 'error',
                detail: this._translateService.instant(
                    ' يوجد حقول مطلوبة '
                ),
            });
        } else{

            console.log(this.formSections.value);
            if(!this.Services_ID){
                this._servicesPageService.saveOutpatientClinicsDepartmentsServices(this.formSections.value);

            }else{
                this._servicesPageService.saveOutpatientClinicsDepartmentsServices({
                    ...this.formSections.value ,
                    ID:this.Services_ID
                });
            }
        }

    }
    clearFormSections(){
this.formSections.reset();
this.formSections.get('TypeID')?.patchValue(5);
    this.formSections.get('IsActive')?.patchValue(false);
    this.formSections.get('NameEn')?.patchValue('نص');
    this.formSections.get('DescEn')?.patchValue('نص');
    this.formSections.get('DescAr')?.patchValue('نص');
    }


    editServices(item: any){
    this.formSections.patchValue(item);

    }
    deleteServices(item: any){
      this._servicesPageService.deleteOutpatientClinicsDepartmentsServices(item.ID);
    }

}
