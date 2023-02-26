import { distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, map } from 'rxjs';
import { HttpService } from './../../services/http.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ViewEvaluationService {
    EvaluationId: any;
    constructor(private http: HttpService) {}
    private store = new BehaviorSubject<{
        Evaluation: { data: any; loading: boolean };
    }>({
        Evaluation: { data: undefined, loading: false },
    });

    store$: Observable<any> = this.store.asObservable();

    get dataStore() {
        return this.store.getValue();
    }
    updateStore(newState: any) {
        this.store.next({
            ...this.dataStore,
            ...newState,
        });
    }
    get Evaluation$() {
        return this.store$.pipe(
            map((value) => value.Evaluation),
            distinctUntilChanged()
        );
    }
    getEvaluation(FormId: any) {
        this.updateStore({ Evaluation: { data: undefined, loading: true } });
        this.http
            .getData('Evaluation', {
                EvaluationId: this.EvaluationId,
                FormId: FormId,
            })
            .subscribe((value) => {
                this.updateStore({
                    Evaluation: { data: value, loading: false },
                });
            });
    }
    saveEvaluation(EvaluationItems: any) {
     return    this.http.saveData('Evaluation/Items', {
            EvaluationId: this.EvaluationId,
            EvaluationItems: EvaluationItems,
        })
    }
}
