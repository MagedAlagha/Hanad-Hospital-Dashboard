import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ServicesPageService } from '../services-page.service';

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
        private _servicesPageService: ServicesPageService
    ) {
        this.formOutpatient = fb.group({
            ID: [],
            IconPath: [],
            NameAr: [],
            NameEn:['نص'],
            DescAr: ['نص'],
            DescEn: ['نص'],
            IsActive: [],
            Sorting: [],
            TypeID: [5],
        });
        this.formSections = fb.group({
            ID: [],
            NameAr: [],
            NameEn: ['نص'],
            DescAr: [],
            DescEn:['نص'],
            OutpatientClinicsDepartmentID: [],
            IsActive: [],
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

    clear(){
     this.formOutpatient.reset();
     this.formOutpatient.get('NameEn')?.patchValue('نص')
     this.formOutpatient.get('DescAr')?.patchValue('نص')
     this.formOutpatient.get('DescEn')?.patchValue('نص')
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
    clearFormSections(){
this.formSections.reset();
    }


    editServices(item: any){
    this.formSections.patchValue(item);

    }
    deleteServices(item: any){
      this._servicesPageService.deleteOutpatientClinicsDepartmentsServices(item.ID);
    }

}
