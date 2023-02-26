import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeesService } from '../../employees.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModalComponent {
    changePasswordForm:FormGroup;
    title:any ;
    constructor(private _EmployeesService: EmployeesService  ,   private fb: FormBuilder) {
        this.changePasswordForm = fb.group({
            Password:[{ value: '', disabled: true }],
            NewPassword:[''],
            ConfirmNewPassword:[''],
        })
    }

    ngOnInit() {
        const data = this._EmployeesService.dataStore.changePasswordDialog?.data;
        if(data){
            this.changePasswordForm.patchValue(data);
           this.title = `تغير كلمة المرور للموظف ( ${data.Name} )`
        }
    }
    closeDialog() {
        this._EmployeesService.displayDialogs('changePasswordDialog', false);
    }
}
