import { PurchaseRequestService } from 'src/app/MAEL_SYSTEM/Procurement/purchase-request/purchase-request.service';
import { Observable, of } from 'rxjs';
import { DialogSharedComponent } from 'src/app/shared/Module-shared/dialog-shared/dialog-shared.component';
import { ButtonComponentComponent } from 'src/app/shared/Module-shared/button-component/button-component.component';
import { SearchFieldComponent } from 'src/app/shared/Module-shared/search-field/search-field.component';
import { TableModule } from 'primeng/table';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IconSharedComponent } from 'src/app/shared/Module-shared/icon-shared/icon-shared.component';
import { SelectFieldComponent } from '../../Module-shared/select-field/select-field.component';
import { InputFieldComponent } from '../../Module-shared/input-field/input-field.component';
import { TranslationModule } from 'src/app/i18n';
import { Input } from '@angular/core';
import { TextAreaFieldComponent } from '../../Module-shared/text-area-field/text-area-field.component';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        IconSharedComponent,
        SelectFieldComponent,
        ReactiveFormsModule,
        InputFieldComponent,
        TableModule,
        SearchFieldComponent,
        ButtonComponentComponent,
        DialogSharedComponent,
        TranslationModule,
        TextAreaFieldComponent,
    ],
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
    TransactionsForm: FormGroup;
    @Input() transactions$: Observable<any> = of();
    constructor(
        private fb: FormBuilder,
        private _purchaseRequestService: PurchaseRequestService
    ) {
        this.TransactionsForm = this.fb.group({
            Action: [null,],
            Notes: [null],
        });
    }

    makeAction(ID:any) {
        this._purchaseRequestService.openOrCloseTransactionDialog(true,{ID:ID});
    }

    ngOnInit() {}
    save() {}
}
