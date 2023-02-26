import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeesService } from './employees.service';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
    displayEmployessDialog$!: Observable<any>;
    changePasswordDialog$!: Observable<any>;
    dataTable: any[] = [];
    constructor(private _EmployeesService: EmployeesService) {}

    ngOnInit() {
        this.displayEmployessDialog$ = this._EmployeesService.Selector$(
            'displayEmployessDialog'
        );
        this.changePasswordDialog$ = this._EmployeesService.Selector$(
            'changePasswordDialog'
        );
        this.dataTable = this._EmployeesService.getAll();
    }

    addFormDataDialog(item?: any) {
        this._EmployeesService.displayDialogs(
            'displayEmployessDialog',
            true,
            item
        );
    }
    showFormDataDialog(item?: any) {
        this._EmployeesService.displayDialogs(
            'displayEmployessDialog',
            true,
           {...item , showData:true }
        );
    }

    changePasswordDialog(item?: any) {
        this._EmployeesService.displayDialogs(
            'changePasswordDialog',
            true,
            item
        );
    }
}
