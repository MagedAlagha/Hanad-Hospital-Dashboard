import { TooltipModule } from 'primeng/tooltip';
import { TrimSpacesPipe } from './../../pipes/trim-spaces.pipe';
import { TranslationModule } from './../../../i18n/translation.module';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        TranslationModule,
        TrimSpacesPipe,
        TooltipModule,
    ],
    selector: 'app-button-component',
    templateUrl: './button-component.component.html',
    styleUrls: ['./button-component.component.scss'],
})
export class ButtonComponentComponent implements OnInit {
    @Output() action = new EventEmitter();
    @Input() label: string = '';
    @Input() disabled: boolean = false;
    @Input() classColor: string = 'p-button-primary';
    @Input() Icon: string = '';
    @Input() pTooltipCustom: any = '';
    @Input() isCustomLable: boolean = false;

    constructor() {}

    ngOnInit() {}
}
