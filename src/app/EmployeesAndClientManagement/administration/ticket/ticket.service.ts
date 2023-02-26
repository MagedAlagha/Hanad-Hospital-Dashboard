import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { selectorsType } from '../clients/clients.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

    constructor() {}
    private store = new BehaviorSubject<StoreInterface>({
        replayTicket: {data: [], isOpen: false },
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

    Selector$(selectorName: selectorsProjectsType) {
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
            Subject: 'انشاء مجمع تجاري',
            Message: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى ...',
            Phone: '0598888888',
            Date: '22/2/2023',
            Status:'تم الرد',
            EmpReplay: 'محمد خالد',
            Section: 'التصميم الداخلي',
        },
        {
            id: 2,
            Subject: 'ترميم بيت قديم',
            Message: 'هذا النص يمكن أن يتم تركيبه على أي تصميم دون مشكلة فلن يبدو وكأنه نص منسوخ، غير منظم، غير منسق، أو حتى غير مفهوم. لأنه مازال نصاً بديلاً ومؤقتاً.',
            Phone: '01254662525',
            Date: '20/1/2023',
            Status:'لم يتم الرد',
            EmpReplay: 'عبدالله احمد',
            Section: 'التصميم الخارجي',
        },
        {
            id: 3,
            Subject: 'تصميم خارطة فيلا',
            Message: 'إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ',
            Phone: '036548524',
            Date: '10/2/2023',
            Status:'تم الرد',
            EmpReplay: 'ماجد خليل',
            Section: 'قسم الانشائي',
        },
        {
            id: 4,
            Subject: 'تصميم مسبج صغير',
            Message: 'هذا النص يمكن أن يتم تركيبه على أي تصميم دون مشكلة فلن يبدو وكأنه نص منسوخ، غير منظم، غير منسق، أو حتى غير مفهوم. لأنه مازال نصاً بديلاً ومؤقتاً. ',
            Phone: '036548524',
            Date: '10/2/2023',
            Status:'لم يتم الرد',
            EmpReplay: 'ابراهيم محمد ',
            Section: 'قسم المعماري',
        },
        {
            id: 5,
            Subject: 'بناء صالة افراح',
            Message: 'ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً،دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق. ...',
            Phone: '0362598544',
            Date: '10/1/2023',
            Status:'تم الرد',
            EmpReplay: 'عبدالرحمن خليل',
            Section: 'قسم المساحة',
        },




    ];
}

}

export interface StoreInterface {
    replayTicket?: { data: any; isOpen: boolean };
}
export type selectorsProjectsType = keyof StoreInterface;

