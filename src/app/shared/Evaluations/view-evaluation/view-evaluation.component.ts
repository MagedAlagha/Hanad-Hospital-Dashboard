import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit } from '@angular/core';
import { ViewEvaluationService } from './view-evaluation.service';

@Component({
    selector: 'app-view-evaluation',
    templateUrl: './view-evaluation.component.html',
    styleUrls: ['./view-evaluation.component.scss'],
})
export class ViewEvaluationComponent implements OnInit {
    Evaluation$!: Observable<any>;
    Categories: any = [];
    constructor(private _viewEvaluationService: ViewEvaluationService) {}

    ngOnInit() {
        this.Evaluation$ = this._viewEvaluationService.Evaluation$.pipe(
            tap((Evaluation: any) => {
                if (Evaluation?.data) {
                    console.log('Evaluation?.data', Evaluation?.data);
                    this.Categories = Evaluation?.data?.Categories;
                    // .map(
                    //     (value: any) => {
                    //         return {
                    //             ...value,
                    //             Items:value.Items.map((item:any)=>{
                    //                 return{
                    //                     ...item,
                    //                     itemValue:
                    //                 }
                    //             })
                    //         };
                    //     }
                    // );
                }
            })
        );
    }
    saveEvaluation() {
        let EvaluationItems: any = [];
        this.Categories.forEach((Category: any) => {
            let Items = Category?.Items;
            if (Items) {
                Items.forEach((item: any) => {
                    EvaluationItems.push({
                        ItemId: item.ItemId,
                        ItemValue: item.ItemValue,
                    });
                });
            }
        });
       return this._viewEvaluationService.saveEvaluation(EvaluationItems);
    }
}
