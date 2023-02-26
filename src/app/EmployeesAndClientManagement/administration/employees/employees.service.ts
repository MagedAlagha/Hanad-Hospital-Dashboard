import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EmployeesService {
    constructor() {}
    private store = new BehaviorSubject<StoreInterface>({
        displayEmployessDialog: { isOpen: false, data: '' },
        changePasswordDialog: { isOpen: false, data: '' },
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
                Name: 'احمد',
                Email: 'ahmed@gmail.com',
                Phone: '0598888888',
                Residence: 'السعودية- الطائف',
                IdCompony:'32654',
                City: 'السعودية- الرياض',
                Section: 'التصميم الداخلي',
                JobRole: 'مهندس',
                BankIBN: 'gr624412hg4kajdff8ge8h5tk5u',
                Message: 'هو المعنى ما نلاحقه دائماً فيما نكتب',
                Password:'ahmed1236A'
            },

            {

                id: 2,
                Name: 'علي ابراهيم',
                Email: 'ali@gmail.com',
                Phone: '0569248536',
                Residence: 'السعودية- جدة',
                IdCompony:'51245',
                City: 'السعودية- مكة',
                Section: 'التصميم الخارجي',
                JobRole: 'مهندس',
                BankIBN: 'gr62غف12hg4kajdff8g315h694k5u',
                Message: 'يسعدنِي تشجيعك،وكذلك دعمكِ لي هنا او في أي مكان آخرْ',
                Password:'*ARM#36987**3'
            },
            {
                id: 3,
                Name: 'ماجد عبدالله',
                Email: 'majed@gmail.com',
                Phone: '0569248536',
                Residence: 'السعودية- المدينة',
                IdCompony:'98641',
                City: 'السعودية- ينبع',
                Section: 'البرمجة',
                JobRole: 'مهندس برمجيات',
                BankIBN: 'opul62غف12hg325ajd69548g315h694k5u',
                Message: 'دمت على درب الابداع و احييك بكل الود',
                Password:'*8989##aa'
            },
            {
                id: 4,
                Name: 'محمد الامين',
                Email: 'mohammed@gmail.com',
                Phone: '0512846266',
                Residence: 'السعودية- المدينة',
                IdCompony:'98641',
                City: 'السعودية- المدينة',
                Section: 'المحاسية',
                JobRole: 'محاسب',
                BankIBN: 'opul62غف12hg325ajd69548g315h694k5u',
                Message: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى',
                Password:'M1258**@'
            },

            {id: 5,
                Name: 'خالد الاحمد',
                Email: 'khaled@gmail.com',
                Phone: '05065849464',
                Residence: 'السعودية- المدينة',
                IdCompony:'326584',
                City: 'السعودية- جدة',
                Section: 'الادارة',
                JobRole: 'محلل مشاريع',
                BankIBN: '31646gh65s9e5tfhy56569i54pp54e6f5',
                Message: 'هذا النص هو مثال لن النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى',
                Password:'khaled$$2022$$'
            },

        ];
    }

}

export interface StoreInterface {
    displayEmployessDialog?: { isOpen: false; data: any};
    changePasswordDialog?: { isOpen: false; data: any};
}
export type selectorsType = keyof StoreInterface;
