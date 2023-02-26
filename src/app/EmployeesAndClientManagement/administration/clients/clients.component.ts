import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientsService } from './clients.service';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
    displayEmployessDialog$!: Observable<any>;
    dataTable: any[] = [];
 /*    title:any = ; */
    constructor(private _ClientsService: ClientsService) {}

    ngOnInit() {
        this.dataTable = this._ClientsService.getAll();
        console.log(this.dataTable);

        this.displayEmployessDialog$ = this._ClientsService.Selector$(
            'displayEmployessDialog'
        );
    }

    FormDataDialog(item?: any) {
        this._ClientsService.displayDialogs(
            'displayEmployessDialog',
            true,
            item
        );
    }

    showFormDataDialog(item?: any) {
        this._ClientsService.displayDialogs(
            'displayEmployessDialog',
            true,
           {...item , showData:true }
        );
    }
}
