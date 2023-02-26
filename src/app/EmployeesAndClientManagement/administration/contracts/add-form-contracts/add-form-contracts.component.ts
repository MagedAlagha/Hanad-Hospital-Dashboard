import { Component } from '@angular/core';
import { ContractsService } from '../contracts.service';

@Component({
    selector: 'app-add-form-contracts',
    templateUrl: './add-form-contracts.component.html',
    styleUrls: ['./add-form-contracts.component.scss'],
})
export class AddFormContractsComponent {
    constructor(private _ContractsService: ContractsService) {}

    closeDialog() {
        this._ContractsService.displayDialogs('displayContractsDialog', false);
    }
}
