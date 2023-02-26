import { TranslationModule } from './../../../i18n/translation.module';
import { CommonModule } from '@angular/common';
import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import {
    AbstractControl,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslationModule,
    ],
    selector: 'app-validation',
    templateUrl: './validation.component.html',
    styleUrls: ['./validation.component.scss'],
})
export class ValidationComponent implements OnInit {
    @Input() control!: AbstractControl;
    @Input() submitted!: boolean;
    constructor() {}

    ngOnInit() {}
}
