import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { getFormApiGonfig } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GetFormApiService } from 'src/app/shared/services/functionsForHandelWithApi/getFormApi.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
    providedIn: 'root',
})
export class ServicesPageService {
    constructor(
        private _http: HttpService,
        private _getFormApiService: GetFormApiService,
        private _authService: AuthService
    ) {}

    store = new BehaviorSubject<jobFunctionalModel>({
        dataTable: { data: [], loading: false },
        MedicalRehabilitationServices: { data: [], loading: false },
        prosthetics: { data: [], loading: false },
        prostheticsTypes: { data: [], loading: false },
        OutpatientClinicsDepartments: { data: [], loading: false },
        OutpatientClinicsDepartmentsServices: { data: [], loading: false },
        prostheticsTypesDialog: { isOpen: false, data: '' },
        addSubitemModalDialog: { isOpen: false, data: '' },
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

    /*  ******* Save Data Slider ******* */
    saveMedicalRehabilitationFeatures(data: any) {
        return this._http
            .saveData(
                'MedicalRehabilitationFeatures/MedicalRehabilitationFeaturesSave',
                data
            )
            .subscribe((value) => {
                this.getMedicalRehabilitationFeatures();
            });
    }
    deleteMedicalRehabilitationFeatures(ID: any) {
        return this._http
            .deleteData(
                'MedicalRehabilitationFeatures/MedicalRehabilitationFeaturesDelete',
                {
                    ID: ID,
                }
            )
            .subscribe((value) => {
                this.getMedicalRehabilitationFeatures();
            });
    }
    getMedicalRehabilitationFeatures() {
        this.getFormApi(
            'MedicalRehabilitationFeatures/MedicalRehabilitationFeaturesSearch',
            'dataTable',
            { isLoading: true }
        );
    }

    /*  ******* Save MedicalRehabilitationServices ******* */
    saveMedicalRehabilitationServices(data: any) {
        return this._http
            .saveData(
                'MedicalRehabilitationServices/MedicalRehabilitationServicesSave',
                data
            )
            .subscribe((value) => {
                this.getMedicalRehabilitationServices();
            });
    }
    deleteMedicalRehabilitationServices(ID: any) {
        return this._http
            .deleteData(
                'MedicalRehabilitationServices/MedicalRehabilitationServicesDelete',
                {
                    ID: ID,
                }
            )
            .subscribe((value) => {
                this.getMedicalRehabilitationServices();
            });
    }
    getMedicalRehabilitationServices() {
        this.getFormApi(
            'MedicalRehabilitationServices/MedicalRehabilitationServicesSearch',
            'MedicalRehabilitationServices',
            { isLoading: true }
        );
    }
    /*  ******* Save prosthetics ******* */
    saveprosthetics(data: any) {
        return this._http
            .saveData('Prosthetics/ProstheticsSave', data)
            .subscribe((value) => {
                this.getprosthetics();
            });
    }
    deleteprosthetics(ID: any) {
        return this._http
            .deleteData(' Prosthetics/ProstheticsDelete', {
                ID: ID,
            })
            .subscribe((value) => {
                this.getprosthetics();
            });
    }
    getprosthetics() {
        this.getFormApi('Prosthetics/ProstheticsSearch', 'prosthetics', {
            isLoading: true,
        });
    }

    /*  ******* Save prosthetics Type ******* */
    saveProstheticsTypes(data: any) {
        return this._http
            .saveData('ProstheticsTypes/ProstheticsTypesSave', data).pipe(tap(value=>{
                this.getProstheticsTypes();
            }))

    }
    deleteProstheticsTypes(ID: any) {
        return this._http
            .deleteData('ProstheticsTypes/ProstheticsTypesDelete', {
                ID: ID,
            })
            .subscribe((value) => {
                this.getProstheticsTypes();
            });
    }
    getProstheticsTypes() {
        this.getFormApi(
            'ProstheticsTypes/ProstheticsTypesSearch',
            'prostheticsTypes',{},
            { isLoading: true }
        );
    }

    /*  ******* Save hearingSectionAr ******* */
    saveHearingSectionAr(data: any) {
        return this._http
            .updateData('Services/Services_HearingSectionAr_Update/HearingSectionAr', data)
            .subscribe();
    }
    /*  ******* Save hearingSectionEn ******* */
    saveHearingSectionEn(data: any) {
        return this._http
            .updateData('Services/Services_HearingSectionEn_Update/HearingSectionEn', data)
            .subscribe();
    }

    /*  ******* Save OutpatientClinicsSectionAr ******* */
    saveOutpatientClinicsSectionAr(data: any) {
        return this._http
            .updateData('Services/Services_OutpatientClinicsSectionAr_Update/OutpatientClinicsSectionAr', data)
            .subscribe();
    }
    /*  ******* Save OutpatientClinicsSectionEn ******* */
    saveOutpatientClinicsSectionEn(data: any) {
        return this._http
            .updateData('Services/Services_OutpatientClinicsSectionEn_Update/OutpatientClinicsSectionEn', data)
            .subscribe();
    }
    /*  ******* First Section Department ******* */
    saveOutpatientClinicsDepartments(data: any) {
        return this._http
            .saveFormData('OutpatientClinicsDepartments/OutpatientClinicsDepartmentsSave', data)
            .subscribe((value)=>{
                this.getOutpatientClinicsDepartments();
            });
    }
    getOutpatientClinicsDepartments() {
        this.getFormApi(
            'OutpatientClinicsDepartments/OutpatientClinicsDepartmentsSearch',
            'OutpatientClinicsDepartments',{},
            { isLoading: true }
        );
    }


    deleteOutpatientClinicsDepartments(ID: any) {
        return this._http
            .deleteData('OutpatientClinicsDepartments/OutpatientClinicsDepartmentsDelete', {
                ID: ID,
            })
            .subscribe((value) => {
                this.getOutpatientClinicsDepartments();
            });
    }

    /*  ******* First  another Sections  ******* */
    saveOutpatientClinicsDepartmentsServices(data: any) {
        return this._http
            .saveData('OutpatientClinicsDepartmentsServices/OutpatientClinicsDepartmentsServicesSave', data)
            .subscribe((value)=>{
                this.getOutpatientClinicsDepartmentsServices();
            });
    }
    getOutpatientClinicsDepartmentsServices() {
        this.getFormApi(
            'OutpatientClinicsDepartmentsServices/OutpatientClinicsDepartmentsServicesSearch',
            'OutpatientClinicsDepartmentsServices',{},
            { isLoading: true }
        );
    }


    deleteOutpatientClinicsDepartmentsServices(ID: any) {
        return this._http
            .deleteData('OutpatientClinicsDepartmentsServices/OutpatientClinicsDepartmentsServicesDelete', {
                ID: ID,
            })
            .subscribe((value) => {
                this.getOutpatientClinicsDepartmentsServices();
            });
    }

    /*  ******* Save Data Services ******* */
    /*  */

    displayDialogs = (DialogName: selectorsType, isOpen: boolean, data?: any) => {
        let dialog = {
            [DialogName]: {
                isOpen: isOpen,
                data: data,
            },
        };
        this.updateStore(dialog);
    };

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
    dataTable?: { data: any; loading: boolean };
    MedicalRehabilitationServices?: { data: any; loading: boolean };
    prosthetics?: { data: any; loading: boolean };
    prostheticsTypes?: { data: any; loading: boolean };
    OutpatientClinicsDepartments?: { data: any; loading: boolean };
    OutpatientClinicsDepartmentsServices?: { data: any; loading: boolean };
    prostheticsTypesDialog?: { isOpen: false; data: any };
    addSubitemModalDialog?: { isOpen: false; data: any };
}
export type selectorsType = keyof jobFunctionalModel;
