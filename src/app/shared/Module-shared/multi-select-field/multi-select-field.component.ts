import { TranslationModule } from './../../../i18n/translation.module';
import { ValidationComponent } from './../validation/validation.component';
import { CommonModule } from '@angular/common';
import {
    Component,
    OnInit,
    forwardRef,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { MultiSelectModule } from 'primeng/multiselect';

import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    FormsModule,
} from '@angular/forms';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ValidationComponent,
        MultiSelectModule,
        TranslationModule,
    ],
    selector: 'app-multi-select-field',
    templateUrl: './multi-select-field.component.html',
    styleUrls: ['./multi-select-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultiSelectFieldComponent),
            multi: true,
        },
    ],
})
export class MultiSelectFieldComponent implements OnInit, ControlValueAccessor {
    constructor() {}
    @Input() submitted: boolean = false;
    @Input() label: string = '';
    @Input() required: boolean = false;
    @Input() disabled: boolean = false;
    @Input() dropdownItems: any;
    @Input() optionLabel: string = 'Name';
    @Input() optionValue: string = 'Code';
    @Output() onSelectionChange = new EventEmitter();
    onChange: any = () => {};
    onTouch: any = () => {};
    val: any;
    set value(val: any) {
        this.val = val;
    }

    writeValue(value: any) {
        if (value) {
            this.val = value.split(',').map((value: string) => +value);
        } else {
            this.val = null;
        }
    }
    registerOnChange(fn: any) {
        this.onChange = fn;
    }
    registerOnTouched(fn: any) {
        this.onTouch = fn;
    }
    select($event: any[]) {
        this.onChange($event.join(','));
        this.onSelectionChange.emit($event);
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }
    ngOnInit() {}
}
