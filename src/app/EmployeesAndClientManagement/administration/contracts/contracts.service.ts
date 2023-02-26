import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ContractsService {
    constructor() {}
    private store = new BehaviorSubject<StoreInterface>({
        displayContractsDialog: { isOpen: false, data: '' },
    });

    store$: Observable<StoreInterface> = this.store.asObservable();
    get dataStore() {
        return this.store.value;
    }
    updateStore(newSate: StoreInterface) {
        this.store.next({
            ...this.store.value,
            ...newSate,
        });
    }

    Selector$(selectorName: selectorsType) {
        return this.store$.pipe(
            map((value: any) => value[selectorName]),
            distinctUntilChanged()
        );
    }

    displayDialogs = (DialogName: string, isOpen: boolean, data?: any) => {
        let dialog = {
            [DialogName]: {
                isOpen: isOpen,
                data: data,
            },
        };
        this.updateStore(dialog);
    };


    getAll(): any[] {
        return [
            {
                id: 1,
                ContractName: 'تصميم مجمع تجاري',
            },
            {
                id: 2,
                ContractName: 'بناء وحدة سكنية',
            },
            {
                id: 1,
                ContractName: 'تصميم شاليه سياحي',
            },
            {
                id: 1,
                ContractName: 'ترميم بيت قديم',
            },
            {
                id: 1,
                ContractName: 'تصميم وبناء عمارة سكنية',
            },






        ];
    }




}

export interface StoreInterface {
    displayContractsDialog?: { isOpen: false; data: '' };
}
export type selectorsType = keyof StoreInterface;
