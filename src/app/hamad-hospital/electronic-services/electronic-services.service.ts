import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { getFormApiGonfig } from 'src/app/shared/models';
import { GetFormApiService } from 'src/app/shared/services/functionsForHandelWithApi/getFormApi.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
    providedIn: 'root',
})
export class ElectronicServicesService {
    constructor(
        private _http: HttpService,
        private _getFormApiService: GetFormApiService
    ) {}
    store = new BehaviorSubject<jobFunctionalModel>({
        PublicServices: { data: [], loading: false },
        Suggestion: { data: [], loading: false },
        Rating: { data: [], loading: false },
        Visitors: { data: [], loading: false },
        PressCoverageRequest: { data: [], loading: false },
        VisitRequest: { data: [], loading: false },
        showMessageDialog: { isOpen: false, data: '' },
    });

    store$ = this.store.asObservable();

    updateStore(newSate: jobFunctionalModel) {
        this.store.next({
            ...this.store.value,
            ...newSate,
        });
    }
    get dataStore() {
        return this.store.getValue();
    }

    Selector$(selector: selectorsType) {
        return this.store$.pipe(
            map((value: any) => value[selector]),
            distinctUntilChanged()
        );
    }
    displayDialogs = (
        DialogName: selectorsType,
        isOpen: boolean,
        data?: any
    ) => {
        let dialog = {
            [DialogName]: {
                isOpen: isOpen,
                data: data,
            },
        };
        this.updateStore(dialog);
    };

    /*  */
    getBeneficiaries() {
        this.getFormApi(
            'PublicServices/PublicServicesSearch',
            'PublicServices',
            { ServiceID: 1 },
            { isLoading: true }
        );
    }
    getSuggestion() {
        this.getFormApi(
            'PublicServices/PublicServicesSearch',
            'Suggestion',
            { ServiceID: 2 },
            { isLoading: true }
        );
    }
    getRating() {
        this.getFormApi(
            'PublicServices/PublicServicesSearch',
            'Rating',
            { ServiceID: 3 },
            { isLoading: true }
        );
    }
    getVisitors() {
        this.getFormApi(
            'PublicServices/PublicServicesSearch',
            'Visitors',
            { ServiceID: 4 },
            { isLoading: true }
        );
    }
    getPressCoverageRequest() {
        this.getFormApi(
            'PublicServices/PublicServicesSearch',
            'PressCoverageRequest',
            { ServiceID: 5 },
            { isLoading: true }
        );
    }
    getVisitRequest() {
        this.getFormApi(
            'PublicServices/PublicServicesSearch',
            'VisitRequest',
            { ServiceID: 6 },
            { isLoading: true }
        );
    }
    excel(){
        let data: any[] = [];
        this.dataStore.PublicServices?.data.forEach((item: any, index: any) => {
            data.push({
                ['#']: index,
                ['الاسم كامل']:item.FullName,
                ['رقم الهوية']: item.IdentityNumber,
                ['الايميل']: item.Email,
                ['الموبايل']: item.PhoneNumber,
                ['العنوان']:item.Address,
                ['الموعد']:item.Appointment,
                ['الموضوع']:item.TextMessage
            });
        });
        this._http.downloadExcel(data, 'المواعيد');
    }
    excel_2(){
        let data: any[] = [];
        this.dataStore.Suggestion?.data.forEach((item: any, index: any) => {
            data.push({
                ['#']: index,
                ['الاسم كامل']:item.FullName,
                ['رقم الهوية']: item.IdentityNumber,
                ['الايميل']: item.Email,
                ['الموبايل']: item.PhoneNumber,
                ['العنوان']:item.Address,
                ['الموضوع']:item.TextMessage
            });
        });
        this._http.downloadExcel(data, 'الاقتراحات');
    }
    excel_3(){
        let data: any[] = [];
        this.dataStore.Rating?.data.forEach((item: any, index: any) => {
            data.push({
                ['#']: index,
                ['الاسم كامل']:item.FullName,
                ['الايميل']: item.Email,
                ['الموبايل']: item.PhoneNumber,
                ['العنوان']:item.Address,
                ['التقييم']:item.HospitalRating
            });
        });
        this._http.downloadExcel(data, 'التقييم');
    }
    excel_4(){
        let data: any[] = [];
        this.dataStore.Visitors?.data.forEach((item: any, index: any) => {
            data.push({
                ['#']: index,
                ['الاسم كامل']:item.FullName,
                ['الايميل']: item.Email,
                ['الموبايل']: item.PhoneNumber,
                ['العنوان']:item.Address,
                ['الموضوع']:item.TextMessage
            });
        });
        this._http.downloadExcel(data, 'الزائريين');
    }
    excel_5(){
        let data: any[] = [];
        this.dataStore.PressCoverageRequest?.data.forEach((item: any, index: any) => {
            data.push({
                ['#']: index,
                ['الاسم كامل']:item.FullName,
                ['الايميل']: item.Email,
                ['الموبايل']: item.PhoneNumber,
                ['العنوان']:item.Address,
                ['الموضوع']:item.TextMessage
            });
        });
        this._http.downloadExcel(data, 'طلب تغطية صحفية');
    }
    excel_6(){
        let data: any[] = [];
        this.dataStore.VisitRequest?.data.forEach((item: any, index: any) => {
            data.push({
                ['#']: index,
                ['الاسم كامل']:item.FullName,
                ['الايميل']: item.Email,
                ['الموبايل']: item.PhoneNumber,
                ['العنوان']:item.Address,
                ['الموضوع']:item.TextMessage
            });
        });
        this._http.downloadExcel(data, 'طلب زيارة');
    }
    getFormApi(
        api: string,
        selector: selectorsType,
        params?: any,
        config?: getFormApiGonfig
    ) {
        this._getFormApiService.getFormApi(
            this.store,
            api,
            selector,
            params,
            config
        );
    }
}
export interface jobFunctionalModel {
    PublicServices?: { data: any; loading: boolean };
    Suggestion?: { data: any; loading: boolean };
    Rating?: { data: any; loading: boolean };
    Visitors?: { data: any; loading: boolean };
    PressCoverageRequest?: { data: any; loading: boolean };
    VisitRequest?: { data: any; loading: boolean };
    showMessageDialog?: { isOpen: false; data: any };
}
export type selectorsType = keyof jobFunctionalModel;
