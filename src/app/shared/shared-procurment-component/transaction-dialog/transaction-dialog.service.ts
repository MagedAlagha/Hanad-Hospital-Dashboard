import { ProcurementService } from 'src/app/MAEL_SYSTEM/Procurement/ProcurementSystem.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { BehaviorSubject, map, distinctUntilChanged } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TransactionDialogService {
    constructor(
        private _procurementService: ProcurementService,
        private _httpService: HttpService
    ) {}

    private store = new BehaviorSubject<StoreInterface>({
        codes: undefined,
        displayAddOrEditDialog: {
            isOpen: false,
            data: '',
        },
    });

    private store$ = this.store.asObservable();

    get dataStore() {
        return this.store.getValue();
    }

    updateOnStore(newState: any) {
        this.store.next({
            ...this.store.getValue(),
            ...newState,
        });
    }

    get codes$() {
        return this.store$.pipe(
            map((value) => value.codes),
            distinctUntilChanged()
        );
    }

    getCodes() {
        this._httpService.getCodes('Transfer').subscribe((value) => {
            this.updateOnStore({ codes: value });
        });
    }

    SaveAction(body: any) {
        return this._httpService
            .saveData('Common/ManagersAction', body)

    }
}

export interface StoreInterface {
    codes: any;
    displayAddOrEditDialog: { isOpen: boolean; data: any };
}
