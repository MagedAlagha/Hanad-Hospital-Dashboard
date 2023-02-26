import { HttpHRService } from './../../services/httpHR.service';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SplitButtonPrintService {
    private store = new BehaviorSubject<{
        Reports: { data: any; loading: boolean };
    }>({
        Reports: { data: '', loading: false },
    });

    store$: Observable<any> = this.store.asObservable();

    get dataStore() {
        return this.store.getValue();
    }

    updateStore(newState: any) {
        this.store.next({
            ...this.dataStore,
            ...newState,
        });
    }

    constructor(
        private _httpService: HttpService,
        private _httpHRService: HttpHRService
    ) {}

    get Reports$() {
        return this.store$.pipe(
            map((value) => value.Reports),
            distinctUntilChanged()
        );
    }

    getReports(apiUrl: string, OutputType: any, params: any, hr: boolean) {
        if (hr) {
            this._httpHRService
                .getBlob(apiUrl, {
                    OutputType: OutputType,
                    ...params,
                })
                .subscribe((_) => {});
        } else {
            this._httpService
                .getBlob(apiUrl, {
                    OutputType: OutputType,
                    ...params,
                })
                .subscribe((_) => {});
        }
    }
}
