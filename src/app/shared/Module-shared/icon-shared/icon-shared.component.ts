import { TranslationModule } from './../../../i18n/translation.module';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    standalone: true,
    imports: [CommonModule, ButtonModule, TooltipModule, TranslationModule],
    selector: 'app-icon-shared',
    templateUrl: './icon-shared.component.html',
    styleUrls: ['./icon-shared.component.scss'],
})
export class IconSharedComponent implements OnInit {
    @Output() action = new EventEmitter();
    @Input() disabled: boolean = false;
    @Input() pTooltipCustom: any = '';
    @Input() classColor: string = 'var(--blue-500)';
    @Input() Icon: string = '';
    @Input() width: any = '';
    @Input() height: any = '';
    @Input() extraClass: any = '';
    @Input() pure: boolean = false;
    constructor() {}

    ngOnInit() {}
}
