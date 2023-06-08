import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map, tap } from 'rxjs';
import { ServicesPageService } from '../../services-page.service';
import { HomeService } from 'src/app/hamad-hospital/home/home.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-prosthetics-types',
    templateUrl: './prosthetics-types.component.html',
    styleUrls: ['./prosthetics-types.component.scss'],
})
export class ProstheticsTypesComponent {
    formprostheticsTypes!: FormGroup<any>;
    prostheticsTypes$!: Observable<any>;
    OutpatientClinicsDepartmentsServices$!: Observable<any>;
    formSections!: FormGroup;
    Services_ID:any;
    OutpatientClinicsDepartmentID:any;
    TypeID:any;
    editItem:boolean = true;
    constructor(
        private _homeService:HomeService,
        private _servicesPageService: ServicesPageService ,
        private fb:FormBuilder,
        private messageService: MessageService,
        private _translateService: TranslateService ,

    ) {
        this.formSections = fb.group({
            ID: [],
            NameAr: [''],
            NameEn: ['نص'],
            DescAr: [''],
            DescEn: ['نص'],
            IsActive: [false],
            Sorting: [],
        })
    }

    ngOnInit() {


        this.prostheticsTypes$ = this._servicesPageService
            .Selector$('prostheticsTypesDialog')
            .pipe(
                tap((value) => {
                    console.log('fawfwwfwfw', value?.data?.ID);

                    this.OutpatientClinicsDepartmentID = value?.data?.ID
                    this.TypeID = value?.data?.TypeID;
                    console.log('878787', this.TypeID);

                })
            );
            this.OutpatientClinicsDepartmentsServices$ = this._servicesPageService.Selector$('OutpatientClinicsDepartmentsServices').pipe(
                map((val) => {
                  return val?.data?.filter((item: any) => {
                    return item.OutpatientClinicsDepartmentID == this.OutpatientClinicsDepartmentID ;
                  });
                }),
                tap((val)=>{

                })
            );
    }


    closeDialog() {
        this._servicesPageService.displayDialogs(
            'prostheticsTypesDialog',
            false
        );

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


            if(!this.Services_ID){
                this._servicesPageService.saveOutpatientClinicsDepartmentsServices({
                    ...this.formSections.value ,
                    OutpatientClinicsDepartmentID:this.OutpatientClinicsDepartmentID,
                    TypeID:this.TypeID
                });

            }else{
                this.messageService.add({
                    severity: 'error',
                    detail: this._translateService.instant(
                        ' حقل القسم مطلوب '
                    ),
                });

            }
        }

    }

    clearFormSections(){
        this.formSections.reset();
        this.formSections.get('TypeID')?.patchValue(this.TypeID);
        this.formSections.get('IsActive')?.patchValue(false);
        this.formSections.get('NameAr')?.patchValue('نص');
        this.formSections.get('NameEn')?.patchValue('نص');
        this.formSections.get('DescEn')?.patchValue('نص');
        this.formSections.get('DescAr')?.patchValue('');
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

    editServices(item: any){
        this.formSections.patchValue(item);
           this.editItem = false;
        }
        deleteServices(item: any){
          this._servicesPageService.deleteOutpatientClinicsDepartmentsServices(item.ID);
        }


}
