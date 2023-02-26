import { getFormApiGonfig } from './../../../shared/models';
import { BehaviorSubject, map, distinctUntilChanged, tap } from 'rxjs';
import { GetFormApiService } from './../../../shared/services/functionsForHandelWithApi/getFormApi.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ProjectsService {
    constructor(
        private _http: HttpService,
        private _getFormApiService: GetFormApiService
    ) {}
    private store = new BehaviorSubject<StoreProjectsInterface>({
        DisplayProjectsDialog: { data: [], isOpen: false },
        tasksDialog: { data: [], isOpen: false },
        attachedFilesDialog: { data: [], isOpen: false },
    });
    store$ = this.store.asObservable();
    updateStore(newSate: any) {
        this.store.next({
            ...this.store.value,
            ...newSate,
        });
    }
    get dataStore(): StoreProjectsInterface {
        return this.store.value;
    }
    Selector$(selector: selectorsProjectsType) {
        return this.store$.pipe(
            map((value: any) => value[selector]),
            distinctUntilChanged()
        );
    }
    displayDialogs = (
        DialogName: selectorsProjectsType,
        isOpen: boolean,
        data?: any
    ) => {
        let dialog = {
            [`${DialogName}`]: { isOpen: isOpen, data: data },
        };
        this.updateStore(dialog);
    };
    getAll(): any[] {
        return [
            {
                id: 1,
                ProjectName: ' سقيغة',
                ProjectID: '012536',
                LocationWAN: '095489896666565966',
                LocationLAN: '965548658875685885',
                StartProject:'22-1-2023',
                EndTimeProject: '22-10-2023',
                Notes:' حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع، ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً'
            },
            {
                id: 2,
                ProjectName: ' القاسم',
                ProjectID: '369421',
                LocationWAN: '025654859632596549',
                LocationLAN: '1452369696587456325',
                StartProject:'10-11-2022',
                EndTimeProject: '10-5-2023',
                Notes:'دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق، هذا النص يمكن أن يتم تركيبه على أي تصميم دون مشكلة فلن يبدو وكأنه نص منسوخ، غير منظم، غير منسق'
            },
            {
                id: 3,
                ProjectName: ' شاهين',
                ProjectID: '368521',
                LocationWAN: '6765675765765387636',
                LocationLAN: '3164643241276566754',
                StartProject:'10-11-2022',
                EndTimeProject: '10-5-2023',
                Notes:'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق،'
            },
            {
                id: 4,
                ProjectName: ' النملة',
                ProjectID: '648521',
                LocationWAN: '7597575765675676657',
                LocationLAN: '794136346546546434',
                StartProject:'25-6-2020',
                EndTimeProject: '26-9-2023',
                Notes:'إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع'
            },
            {
                id: 4,
                ProjectName: ' الوحدة',
                ProjectID: '665576',
                LocationWAN: '9793413745376535355',
                LocationLAN: '868468432463863484',
                StartProject:'10-2-2022',
                EndTimeProject: '20-1-2023',
                Notes:'حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق'
            },





        ];
    }
    getAllTask(): any[] {
        return [
            {
                id: 1,
                TaskName: ' تثبيت موقع	',
                TaskType: ' اصدار قرار مساحي	',
                Section: ' قسم المساحة	',
                visible: true,
            },
            {
                id: 2,
                TaskName: ' فرز ارض	',
                TaskType: ' فرز الاراضي',
                Section: ' قسم الانشائي	',
                visible: false,
            },
            {
                id: 3,
                TaskName: ' حساب كمية المواد	',
                TaskType: ' حساب كميات',
                Section: ' قسم المعماري	',
                visible: true,
            },
            {
                id: 4,
                TaskName: '  جديدة تصميم فكرة	',
                TaskType: ' تصميم الفكره',
                Section: ' قسم المعماري	',
                visible:false,
            },
            {
                id: 5,
                TaskName: '  انشاء بيت	',
                TaskType: ' معاينة موقع',
                Section: ' قسم الانشائي	',
                visible: true,
            },


        ];
    }
}
export interface StoreProjectsInterface {
    DisplayProjectsDialog?: { data: any; isOpen: boolean };
    tasksDialog?: { data: any; isOpen: boolean };
    attachedFilesDialog?: { data: any; isOpen: boolean };
}
export type selectorsProjectsType = keyof StoreProjectsInterface;
