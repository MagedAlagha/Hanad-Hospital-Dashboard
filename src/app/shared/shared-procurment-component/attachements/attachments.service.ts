import { map, distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { ProcurementService } from 'src/app/MAEL_SYSTEM/Procurement/ProcurementSystem.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AttachmentsService {
    constructor(
        private _procurementService: ProcurementService,
        private _http: HttpService
    ) {}

    private store = new BehaviorSubject<{
        codes: any;
    }>({
        codes: undefined,
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
        this._http.getCodes('file').subscribe((value) => {
            this.updateOnStore({ codes: value });
        });
    }

    getFile() {
       return this._http
            .getData('Common/File', {
                OrderNo: this._procurementService.OrderNoSelected,
            })

    }
    addFile(body: any) {
       return this._http
            .saveFormData('Common/File', {
                ...body,
                OrderNo: this._procurementService.OrderNoSelected,
            })

    }
    deleteFile(body: any) {
        return this._http
             .deleteData('Common/File', {
                 ...body,
                 OrderNo: this._procurementService.OrderNoSelected,
             })

     }
}
