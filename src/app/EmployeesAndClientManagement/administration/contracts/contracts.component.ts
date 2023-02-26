import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ContractsService } from './contracts.service';

@Component({
    selector: 'app-contracts',
    templateUrl: './contracts.component.html',
    styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent implements OnInit {
    displayContractsDialog$!: Observable<any>;
    constructor(private _ContractsService: ContractsService) {}
dataTabel:any[] = [];

    ngOnInit() {
        this.displayContractsDialog$ = this._ContractsService.Selector$(
            'displayContractsDialog'
        );
        this.dataTabel = this._ContractsService.getAll();

    }

    addFormDataDialog(item?: any) {
        this._ContractsService.displayDialogs(
            'displayContractsDialog',
            true,
            item
        );
    }
}
