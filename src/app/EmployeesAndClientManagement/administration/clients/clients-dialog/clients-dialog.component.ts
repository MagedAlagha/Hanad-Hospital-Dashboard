import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ClientsService } from '../clients.service';

@Component({
    selector: 'app-clients-dialog',
    templateUrl: './clients-dialog.component.html',
    styleUrls: ['./clients-dialog.component.scss'],
})
export class ClientsDialogComponent {
    FilterForm: FormGroup;
    dataTable: any[] = [];
    disabled:boolean  =false ;
    title:any = "إنشاء عميل جديد";
     hideBtns:boolean =  true;
    constructor(
        private _ClientsService: ClientsService,
        private fb: FormBuilder
    ) {
        this.FilterForm = this.fb.group({
            id: [null],
            name: [null],
            phone: [null],
            projects:[null],
            email: [null],
            emailText:[null],
            IDNumber: [null],
        });
    }
    ngOnInit(): void {
        this.dataTable = this._ClientsService.getAll();
        const data =
            this._ClientsService.dataStore.displayEmployessDialog?.data;
        if (data) {
            console.log(data, 'data');
            this.FilterForm.patchValue(data);
            this.FilterForm.get('emailText')?.disable();
            this.title = ` تعديل بيانات العميل ( ${data.name} )`;
            if(data.showData){
                this.title = ` عرض بيانات العميل ( ${data.name} )`
                this.FilterForm?.disable();
                this.hideBtns = false
             }else{
                 this.hideBtns = true
             }
        }


    }
    closeDialog() {
        this._ClientsService.displayDialogs('displayEmployessDialog', false);
    }
    projects:any = [
        { Name:"مشروع 1 " , Code:1},
        { Name:"مشروع 2" , Code:2},
        { Name:"مشروع 3" , Code:3},
        { Name:"مشروع 4" , Code:4},
        { Name:"مشروع 5" , Code:5},
    ]
}
