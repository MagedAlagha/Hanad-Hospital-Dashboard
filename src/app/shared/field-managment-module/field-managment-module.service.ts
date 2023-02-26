import { HttpService } from './../services/http.service';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FieldManagmentService {
    store = new BehaviorSubject<{
        [ComponentType: string]: FieldManagmentModel;
    }>({});
    store$: Observable<{
        [ComponentType: string]: FieldManagmentModel;
    }> = this.store.asObservable();
    get dataStore() {
        return this.store.value;
    }
    createInitValueForStore(ComponentType: string) {
        this.updateStore(ComponentType, {
            Fields: { data: [], loading: false },
            AddFieldDialog: { data: [], isOpen: false },
            Codes: {},
            FieldManagmentDialog: { data: [], isOpen: false },
            CategorySelected: null,
            FieldsForCategory: { data: [], loading: false },
            FieldsForCategoryDialog: { data: [], loading: false },
        });
    }
    SelectorByComponent$(SelectorKey: string, ComponentType: string) {
        return this.store$.pipe(
            map((value: any) => value[ComponentType][SelectorKey]),
            distinctUntilChanged()
        );
    }
    constructor(private http: HttpService) {}
    updateStore(ComponentType: any, newState: FieldManagmentModel) {
        console.log('newState', newState);
        let store = this.store.value;
        store[ComponentType] = { ...store[ComponentType], ...newState };
        let newStore = store;
        this.store.next(newStore);
    }

    displayDialogs = (
        ComponentType: any,
        DialogName: string,
        isOpen: boolean,
        data?: any
    ) => {
        let dialog = `{"${DialogName}":{
            "isOpen": ${isOpen},
            "data": ${JSON.stringify(data || {})}
        }}`;
        this.updateStore(ComponentType, JSON.parse(dialog));
    };
    getFields(ComponentType: any) {
        this.updateStore(ComponentType, {
            Fields: { data: [], loading: false },
        });
        this.http
            .getData('Fields/CommonFields', { ComponentType })
            .subscribe((value) => {
                this.updateStore(ComponentType, {
                    Fields: { data: value, loading: false },
                });
            });
    }

    addFeild(data: any) {
        return this.http.saveData('Fields/CommonFields', data);
    }
    deleteFeild(ID: any) {
        return this.http.deleteData('Fields/CommonFields', { ID: ID });
    }

    getFieldsForCategory(ComponentType: any) {
        this.updateStore(ComponentType, {
            FieldsForCategory: { data: [], loading: false },
        });
        this.http
            .getData('Fields/CommonFieldsCategory', {
                ComponentType,
                CategoryId: this.dataStore[ComponentType].CategorySelected,
            })
            .subscribe((value) => {
                this.updateStore(ComponentType, {
                    FieldsForCategory: { data: value, loading: false },
                });
            });
    }
    addFeildForCategory(body: any) {
        return this.http.saveData('common/FileUploadCategory', body);
    }
    selectCategory(ComponentType: any, CategorySelected: any) {
        this.updateStore(ComponentType, {
            CategorySelected,
        });
    }
}
export interface FieldManagmentModel {
    Fields?: { data: any[]; loading: boolean };
    AddFieldDialog?: { data: any; isOpen: boolean };
    Codes?: any;
    FieldManagmentDialog?: { data: any; isOpen: boolean };
    CategorySelected?: any;
    FieldsForCategory?: { data: any[]; loading: boolean };
    FieldsForCategoryDialog?: { data: any[]; loading: boolean };
}
