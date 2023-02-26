import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ClientsService {
    constructor() {}
    private store = new BehaviorSubject<StoreInterface>({
        displayEmployessDialog: { isOpen: false, data: '' },
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
                name: 'احمد',
                phone: '0598888888',
                email: '789987789',
                emailText: 'هو المعنى ما نلاحقه دائماً فيما نكتب',
                IDNumber: '123123123',
                projects:[
                    { Name:"مشروع 1 " , Code:1},
                    { Name:"مشروع 2" , Code:2},
                    { Name:"مشروع 3" , Code:3},
                    { Name:"مشروع 4" , Code:4},
                    { Name:"مشروع 5" , Code:5},
                ]
            },

            {
                id: 2,
                name: ' محمد احمد',
                phone: '0598848888',
                email: '789654789',
                emailText: 'شكراً جزيلاً على مرورك الطيب ، أسعدنِي بحقّ',
                IDNumber: '789789789',

            },
            {
                id: 3,
                name: 'رنيم اسامة ',
                phone: '0598778888',
                email: '147896325',
                emailText:
                    'يسعدنِي تشجيعك،وكذلك دعمكِ لي هنا او في أي مكان آخرْ',
                IDNumber: '456456456',
            },
            {
                id: 4,
                name: 'عبد الله',
                phone: '05988886666',
                email: '123369874',
                emailText: 'دمت على درب الابداع و احييك بكل الود',
                IDNumber: '147147147',
            },

            {
                id: 5,
                name: 'ماجد خلة',
                phone: '0598881111',
                email: '456555456',
                emailText: 'كانَ في عينيهِ كلامٌ كثيرٌ',
                IDNumber: '852852852',
            },
            {
                id: 6,
                name: 'اياد مهدي',
                phone: '0593388888',
                email: '444444444',
                emailText: 'في لحظةٍ لمْ يعدْ موجوداً',
                IDNumber: '963963963',
            },
        ];
    }
}

export interface StoreInterface {
    displayEmployessDialog?: { isOpen: false; data: any };
}
export type selectorsType = keyof StoreInterface;
