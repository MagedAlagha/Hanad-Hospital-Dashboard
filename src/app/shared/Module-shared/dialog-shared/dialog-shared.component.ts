import { TranslationModule } from './../../../i18n/translation.module';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
    standalone: true,
    imports: [DialogModule, TranslationModule],
    selector: 'app-dialog-shared',
    templateUrl: './dialog-shared.component.html',
    styleUrls: ['./dialog-shared.component.scss'],
})
export class DialogSharedComponent implements OnInit {
    constructor() {}
    @Input() width: string = '75vw';
    @Input() height!: string;
    @Input() dialogHeader: string = '';
    @Output() close = new EventEmitter<any>();
    ngOnInit() {}
}
