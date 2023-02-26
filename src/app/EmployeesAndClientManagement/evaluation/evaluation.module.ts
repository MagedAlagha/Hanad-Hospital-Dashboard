import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluationComponent } from './evaluation.component';
import { RouterModule } from '@angular/router';
import {RatingModule} from 'primeng/rating';



@NgModule({
  declarations: [
    EvaluationComponent
  ],
  imports: [
    CommonModule ,
    RatingModule,
    RouterModule.forChild([
        {
            path: '',
            component: EvaluationComponent,
        },
    ]),
  ]
})
export class EvaluationModule { }
