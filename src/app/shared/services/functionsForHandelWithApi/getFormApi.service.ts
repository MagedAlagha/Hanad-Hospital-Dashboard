import { catchError, map } from 'rxjs/operators';
import { getFormApiGonfig } from './../../models';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpHRService } from '../httpHR.service';

@Injectable({
    providedIn: 'root',
})
export class GetFormApiService {
    constructor(private _http: HttpHRService) {}

    getFormApi(
        store: BehaviorSubject<any>,
        api: string,
        selector: any,
        params?: any,
        Config?: getFormApiGonfig,
        CustomFunctionForMamping?: Function
    ) {
        const updateStore = (newSate: any) => {
            store.next({
                ...store.value,
                ...newSate,
            });
        };
        const customUpdateStore = (
            data: any,
            valueLoading: boolean = false
        ) => {
            if (Config?.isLoading) {
                updateStore({
                    [`${selector}`]: {
                        data: data,
                        loading: valueLoading,
                    },
                });
            } else {
                updateStore({
                    [`${selector}`]: data,
                });
            }
        };
        customUpdateStore([], true);
        this['_http']
            .getData(api, params)
            .pipe(
                map((res: any) => {
                    if (Config?.isFirstIndex && res) {
                        return res[0];
                    }

                    return res;
                }),
                map((res) => {
                    if (CustomFunctionForMamping) {
                        return CustomFunctionForMamping(res);
                    }

                    return res;
                })
                // catchError((value) => of([]))
            )
            .subscribe({
                next: (value) => {
                    customUpdateStore(value, false);
                },
                error: (err) => {
                    customUpdateStore([], false);
                },
            });
    }
}
