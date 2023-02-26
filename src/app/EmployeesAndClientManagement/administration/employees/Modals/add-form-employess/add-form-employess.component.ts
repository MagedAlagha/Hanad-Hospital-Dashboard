import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeesService } from '../../employees.service';

@Component({
    selector: 'app-add-form-employess',
    templateUrl: './add-form-employess.component.html',
    styleUrls: ['./add-form-employess.component.scss'],
})
export class AddFormEmployessComponent {
    employessForm:FormGroup;
    dataTable: any[] = [];
    title:any = "إنشاء موظف جديد";
    hideBtns:boolean =  true;
    constructor(private _EmployeesService: EmployeesService  ,   private fb: FormBuilder) {
        this.employessForm = this.fb.group({
            id: [null],
            Name: [null],
            Email: [null],
            Phone:[null],
            Residence: [null],
            IdCompony:[null],
            IDNumber: [null],
            City: [null],
            Section: [null],
            JobRole: [null],
            BankIBN: [null],
            Message: [null],
        });
    }

    ngOnInit(): void {
        this.dataTable = this._EmployeesService.getAll();
        const data =
            this._EmployeesService.dataStore.displayEmployessDialog?.data;
        if (data) {
            console.log(data, 'data');
            this.employessForm.patchValue(data);
            this.employessForm.get('Name')?.disable();
            this.employessForm.get('IdCompony')?.disable();
            this.employessForm.get('Section')?.disable();
            this.employessForm.get('JobRole')?.disable();
            this.employessForm.get('BankIBN')?.disable();
            this.employessForm.get('Message')?.disable();
            this.title = ` تعديل بيانات الموظف ( ${data.Name} )`
            /* Show Data */
            if(data.showData){
                this.title = ` عرض بيانات الموظف ( ${data.Name} )`
               this.employessForm?.disable();
               this.hideBtns = false
            }else{
                this.hideBtns = true
            }
        }




    }
    closeDialog() {
        this._EmployeesService.displayDialogs('displayEmployessDialog', false);
    }
}
