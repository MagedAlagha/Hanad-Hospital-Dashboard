import { TranslationModule } from './../../../i18n/translation.module';
import { Component, Input, OnInit } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    standalone: true,
    imports: [
        ProgressSpinnerModule,
        TranslationModule,
        CommonModule,
        SkeletonModule,
    ],
    selector: 'app-spinner-loading',
    templateUrl: './spinner-loading.component.html',
    styleUrls: ['./spinner-loading.component.scss'],
})
export class SpinnerLoadingComponent implements OnInit {
    @Input() Skeleton: boolean = false;
    @Input() Feilds: any = 10;
    @Input() Col: any = 3;
    @Input() height: any = 3;
    FeildsArray = Array(this.Feilds);
    Cols = `md:col-${this.Col}`;
    heightInRem = `${this.height}rem`;
    constructor() {}

    ngOnInit() {
        this.FeildsArray = Array(this.Feilds);
        this.Cols = `md:col-${this.Col}`;
        this.heightInRem = `${this.height}rem`;
    }
}
