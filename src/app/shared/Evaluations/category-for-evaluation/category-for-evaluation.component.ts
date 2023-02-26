import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-category-for-evaluation',
    templateUrl: './category-for-evaluation.component.html',
    styleUrls: ['./category-for-evaluation.component.scss'],
})
export class CategoryForEvaluationComponent implements OnInit {
    @Input() Category: any = [];
    constructor() {}

    ngOnInit() {}
}
