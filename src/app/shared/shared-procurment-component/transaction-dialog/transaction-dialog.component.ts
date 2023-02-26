import { PurchaseRequestService } from 'src/app/MAEL_SYSTEM/Procurement/purchase-request/purchase-request.service';
import { TransactionDialogService } from './transaction-dialog.service';
import { Observable } from 'rxjs';
import { TranslationModule } from 'src/app/i18n/translation.module';
import { DialogSharedComponent } from 'src/app/shared/Module-shared/dialog-shared/dialog-shared.component';
import { ButtonComponentComponent } from 'src/app/shared/Module-shared/button-component/button-component.component';
import { SearchFieldComponent } from 'src/app/shared/Module-shared/search-field/search-field.component';
import { TableModule } from 'primeng/table';
import { InputFieldComponent } from 'src/app/shared/Module-shared/input-field/input-field.component';
import { SelectFieldComponent } from 'src/app/shared/Module-shared/select-field/select-field.component';
import { IconSharedComponent } from 'src/app/shared/Module-shared/icon-shared/icon-shared.component';
import { CommonModule } from '@angular/common';
import {
    FormGroup,
    FormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { SpinnerLoadingComponent } from '../../Module-shared/spinner-loading/spinner-loading.component';
import { TextAreaFieldComponent } from '../../Module-shared/text-area-field/text-area-field.component';
import { MessageService } from 'primeng/api';

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
        SpinnerLoadingComponent,
        TextAreaFieldComponent,
    ],
    selector: 'app-transaction-dialog',
    templateUrl: './transaction-dialog.component.html',
    styleUrls: ['./transaction-dialog.component.scss'],
})
export class TransactionDialogComponent implements OnInit {
    TransactionsForm: FormGroup;
    codes$!: Observable<any>;
    @Input() ScreenID: any;
    @Input() FormID: any;
    @Input() ID: any;
    constructor(
        private fb: FormBuilder,
        private _transactionDialogService: TransactionDialogService,
        private _purchaseRequestService: PurchaseRequestService,
        private messageService: MessageService
    ) {
        this.TransactionsForm = this.fb.group({
            ActionCode: [null, Validators.required],
            Notes: [null],
        });
    }

    ngOnInit() {
        this._transactionDialogService.getCodes();
        this.codes$ = this._transactionDialogService.codes$;
    }

    save() {
        if (this.TransactionsForm.valid) {
            this._transactionDialogService
                .SaveAction({
                    ...this.TransactionsForm.value,
                    ScreenID: this.ScreenID,
                    FormID: this.FormID,
                    ID: this.ID,
                })
                .subscribe((value) => {
                    this._purchaseRequestService.getTransactions();
                    this.Close();
                });
        } else {
            this.messageService.add({
                severity: 'success',
                summary: 'error',
                detail: 'الرجاء اختيار الإجراء',
            });
        }
    }

    Close() {
        this._purchaseRequestService.openOrCloseTransactionDialog(false);
    }
}
