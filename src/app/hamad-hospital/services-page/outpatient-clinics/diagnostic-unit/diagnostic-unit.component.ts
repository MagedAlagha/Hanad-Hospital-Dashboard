import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { ServicesPageService } from '../../services-page.service';

@Component({
    selector: 'app-diagnostic-unit',
    templateUrl: './diagnostic-unit.component.html',
    styleUrls: ['./diagnostic-unit.component.scss'],
})
export class DiagnosticUnitComponent {
    formOutpatientClinicsSection!: FormGroup<any>;
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
            NameEn: [],
            DescAr: [],
            DescEn: [],
            IsActive: [],
            Sorting: [],
        });
        this.formSections = fb.group({
            ID: [],
            NameAr: [],
            NameEn: [],
            DescAr: [],
            DescEn: [],
            OutpatientClinicsDepartmentID: [],
            IsActive: [],
            Sorting: [],
        })
        this.formOutpatientClinicsSection = fb.group({
            OutpatientClinicsSectionAr: [null],
            OutpatientClinicsSectionEn: [null],
        });

    }

    ngOnInit() {
        this.prosthetics$ = this._servicesPageService.Selector$('prosthetics');
        this.getOutpatientClinicsDepartments$ = this._servicesPageService.Selector$('OutpatientClinicsDepartments');
        this.OutpatientClinicsDepartmentsServices$ = this._servicesPageService.Selector$('OutpatientClinicsDepartmentsServices')
    }

    saveOutpatientClinicsSection() {
        this._servicesPageService.saveOutpatientClinicsSection(
            {
                ...this.formOutpatientClinicsSection.value ,
                OutpatientClinicsSectionImagePath: this.fileSelected_2,
            }
        );
    }

    saveFormOutpatient() {
        console.log("this.fileSelected" , this.fileSelected_2) ;
        if(!this.ID){
        this._servicesPageService.saveOutpatientClinicsDepartments({
            ...this.formOutpatient.value,
            IconPath: this.fileSelected,
        });
       }else{
        this._servicesPageService.saveOutpatientClinicsDepartments({
            ...this.formOutpatient.value,
            IconPath: this.fileSelected,
            ID:this.ID
        });
       }
       this.clear();
    }

    clear(){
this.formOutpatient.reset()
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
