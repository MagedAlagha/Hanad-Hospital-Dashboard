import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { ServicesPageService } from '../../services-page.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { HomeService } from 'src/app/hamad-hospital/home/home.service';

@Component({
    selector: 'app-diagnostic-unit',
    templateUrl: './diagnostic-unit.component.html',
    styleUrls: ['./diagnostic-unit.component.scss'],
})
export class DiagnosticUnitComponent {
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
        private _translateService: TranslateService,
        private _homeService: HomeService

    ) {
        this.formOutpatient = fb.group({
            ID: [],
            IconPath: [],
            NameAr: [null, Validators.required],
            NameEn: ['نص'],
            DescAr: ['نص'],
            DescEn: ['نص'],
            IsActive: [false],
            Sorting: [],
            TypeID: [4],
        });
        this.formSections = fb.group({
            ID: [],
            NameAr: ['نص'],
            NameEn: ['نص'],
            DescAr: [null],
            DescEn: ['نص'],
            OutpatientClinicsDepartmentID: [null,Validators.required],
            IsActive: [false],
            Sorting: [],
            TypeID: [4],
        })


    }

    ngOnInit() {
        this.prosthetics$ = this._servicesPageService.Selector$('prosthetics');
        this.getOutpatientClinicsDepartments$ = this._servicesPageService.Selector$('OutpatientClinicsDepartments').pipe(
            map((val) => {
              return val?.data?.filter((item: any) => {
                return item.TypeID == 4;
              });
            })
          );

          this.OutpatientClinicsDepartmentsServices$ = this._servicesPageService.Selector$('OutpatientClinicsDepartmentsServices').pipe(
            map((val) => {
              return val?.data?.filter((item: any) => {
                return item.TypeID == 4;
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
    this.formOutpatient.reset();
    this.formOutpatient.get('TypeID')?.patchValue(4);
    this.formOutpatient.get('IsActive')?.patchValue(false);
    this.formOutpatient.get('NameAr')?.patchValue('');
    this.formOutpatient.get('NameEn')?.patchValue('نص');
    this.formOutpatient.get('DescEn')?.patchValue('نص');
    this.formOutpatient.get('DescAr')?.patchValue('نص');
    this.ID = null;
    }

    clearFormOutpatient() {
    this.formOutpatient.reset();
    this.ID = null;
    }
    editItem(item: any) {
      this.formOutpatient.patchValue(item);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    deleteItem(item: any) {
        this._servicesPageService.deleteOutpatientClinicsDepartments(item.ID);
    }

    saveFormSections(){
        if (this.formSections.invalid) {
            this.messageService.add({
                severity: 'error',
                detail: this._translateService.instant(
                    ' حقل القسم مطلوب '
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
            this.clearFormSections();
        }


    }
    clearFormSections(){
    this.formSections.reset();
    this.formSections.get('TypeID')?.patchValue(4);
    this.formSections.get('IsActive')?.patchValue(false);
    this.formSections.get('NameAr')?.patchValue('نص');
    this.formSections.get('NameEn')?.patchValue('نص');
    this.formSections.get('DescEn')?.patchValue('نص');
    this.formSections.get('DescAr')?.patchValue('');

    }


    editServices(item: any){
    this.formSections.patchValue(item);

    }
    deleteServices(item: any){
      this._servicesPageService.deleteOutpatientClinicsDepartmentsServices(item.ID);
    }

    onRowReorder(event: any, value: any) {
        console.log('event', event);
        console.log('value', value);
        console.log('value', value);
        let newVlue = value?.map((element: any, index: any) => {
            return { id: element.ID, sorting: index };
        });
        console.log('newVlue', newVlue);
        this._homeService.RowReorder(newVlue , 'OutpatientClinicsDepartments').subscribe();
    }
    onRowReorder2(event: any, value: any) {
        console.log('event', event);
        console.log('value', value);
        console.log('value', value);
        let newVlue = value?.map((element: any, index: any) => {
            return { id: element.ID, sorting: index };
        });
        console.log('newVlue', newVlue);
        this._homeService.RowReorder(newVlue , 'OutpatientClinicsDepartmentsServices').subscribe();
    }

}
