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
        ProstheticsTypeselect: { data: [], loading: false },
        OutpatientClinicsDepartments: { data: [], loading: false },
        HearingDepartemt: { data: [], loading: false },
        OutpatientClinicsDepartmentsServices: { data: [], loading: false },
        SupportiveMedicalDepartments: { data: [], loading: false },
        Services: { data: [], loading: false },
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
            .deleteData('Prosthetics/ProstheticsDelete', {
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
            .saveData('ProstheticsTypes/ProstheticsTypesSave', data)
            .pipe(
                tap((value) => {
                    this.getProstheticsTypes();
                })
            );
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
            'prostheticsTypes',
            {},
            { isLoading: true }
        );
    }
    getProstheticsTypeselect() {
        this.getFormApi(
            'ProstheticsTypes/ProstheticsTypesSearch',
            'ProstheticsTypeselect',
            {},
            { isLoading: false }
        );
    }


    /*  ******* Save hearingSection ******* */
    saveHearingSection(data: any) {
        return this._http
            .updateFormData(
                'Services/Services_HearingSection_Update/HearingSection',
                data
            )
            .subscribe();
    }

    /*  ******* Save OutpatientClinicsSection ******* */
    saveOutpatientClinicsSection(data: any) {
        return this._http
            .updateFormData(
                'Services/Services_OutpatientClinicsSection_Update/OutpatientClinicsSection',
                data
            )
            .subscribe();
    }

    /*  ******* First Section Department ******* */
    saveOutpatientClinicsDepartments(data: any) {
        return this._http
            .saveFormData(
                'OutpatientClinicsDepartments/OutpatientClinicsDepartmentsSave',
                data
            )
            .subscribe((value) => {
                this.getOutpatientClinicsDepartments();
            });
    }
    getOutpatientClinicsDepartments() {
        this.getFormApi(
            'OutpatientClinicsDepartments/OutpatientClinicsDepartmentsSearch',
            'OutpatientClinicsDepartments',
            {},
            { isLoading: true }
        );
    }

    deleteOutpatientClinicsDepartments(ID: any) {
        return this._http
            .deleteData(
                'OutpatientClinicsDepartments/OutpatientClinicsDepartmentsDelete',
                {
                    ID: ID,
                }
            )
            .subscribe((value) => {
                this.getOutpatientClinicsDepartments();
            });
    }
    /*  *************** First Hearing Departemt *************** */
    saveHearingDepartemt(data: any) {
        return this._http
            .saveFormData(
                'HearingDepartments/HearingDepartmentsSave',
                data
            )
            .subscribe((value) => {
                this.getHearingDepartemt();
            });
    }
    getHearingDepartemt() {
        this.getFormApi(
            'HearingDepartments/HearingDepartmentsSearch',
            'HearingDepartemt',
            {},
            { isLoading: true }
        );
    }

    deleteHearingDepartemt(ID: any) {
        return this._http
            .deleteData(
                'HearingDepartments/HearingDepartmentsDelete',
                {
                    ID: ID,
                }
            )
            .subscribe((value) => {
                this.getHearingDepartemt();
            });
    }
    /*  *************** First SupportiveMedicalDepartments Departemt *************** */
    saveSupportiveMedicalDepartments(data: any) {
        return this._http
            .saveFormData(
                'SupportiveMedicalDepartments/SupportiveMedicalDepartmentsSave',
                data
            )
            .subscribe((value) => {
                this.getSupportiveMedicalDepartments();
            });
    }
    getSupportiveMedicalDepartments() {
        this.getFormApi(
            'SupportiveMedicalDepartments/SupportiveMedicalDepartmentsSearch',
            'SupportiveMedicalDepartments',
            {},
            { isLoading: true }
        );
    }

    deleteSupportiveMedicalDepartments(ID: any) {
        return this._http
            .deleteData(
                'SupportiveMedicalDepartments/SupportiveMedicalDepartmentsDelete',
                {
                    ID: ID,
                }
            )
            .subscribe((value) => {
                this.getSupportiveMedicalDepartments();
            });
    }

    /*  ******* First  another Sections  ******* */
    saveOutpatientClinicsDepartmentsServices(data: any) {
        return this._http
            .saveData(
                'OutpatientClinicsDepartmentsServices/OutpatientClinicsDepartmentsServicesSave',
                data
            )
            .subscribe((value) => {
                this.getOutpatientClinicsDepartmentsServices();
            });
    }
    getOutpatientClinicsDepartmentsServices() {
        this.getFormApi(
            'OutpatientClinicsDepartmentsServices/OutpatientClinicsDepartmentsServicesSearch',
            'OutpatientClinicsDepartmentsServices',
            {},
            { isLoading: true }
        );
    }

    deleteOutpatientClinicsDepartmentsServices(ID: any) {
        return this._http
            .deleteData(
                'OutpatientClinicsDepartmentsServices/OutpatientClinicsDepartmentsServicesDelete',
                {
                    ID: ID,
                }
            )
            .subscribe((value) => {
                this.getOutpatientClinicsDepartmentsServices();
            });
    }

    /*  ******* get data ******* */

    getServices() {
        this.getFormApi(
            'Services/ServicesSearch',
            'Services',
            {},
            { isLoading: true }
        );
    }

    /*  */

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
    ProstheticsTypeselect?: { data: any; loading: boolean };
    OutpatientClinicsDepartments?: { data: any; loading: boolean };
    HearingDepartemt?: { data: any; loading: boolean };
    SupportiveMedicalDepartments?: { data: any; loading: boolean };
    OutpatientClinicsDepartmentsServices?: { data: any; loading: boolean };
    Services?: { data: any; loading: boolean };
    prostheticsTypesDialog?: { isOpen: false; data: any };
    addSubitemModalDialog?: { isOpen: false; data: any };
}
export type selectorsType = keyof jobFunctionalModel;
