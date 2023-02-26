import { Subscription } from 'rxjs';
import {
    AbstractControl,
    ControlValueAccessor,
    FormControl,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-dynamic-field',
    templateUrl: './dynamic-field.component.html',
    styleUrls: ['./dynamic-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DynamicFieldComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: DynamicFieldComponent,
            multi: true,
        },
    ],
})
export class DynamicFieldComponent
    implements OnInit, ControlValueAccessor, OnDestroy
{
    @Input() isRequired: boolean = false;

    @Input() TypeField: number | undefined;
    @Input() label: string = '';
    @Input() dropdownItems: any = [];
    @Input() optionLabel: string = 'Name';
    @Input() optionValue: string = 'Code';
    unSub!: Subscription;
    valueFieldControl = new FormControl();
    onChange: any = () => {};
    onTouch: any = () => {};
    constructor() {}

    writeValue(value: any): void {
        this.valueFieldControl.setValue(value);
    }
    registerOnChange(fn: any) {
        this.onChange = fn;
    }
    registerOnTouched(fn: any) {
        this.onTouch = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        if (isDisabled) {
            this.valueFieldControl?.disable();
        } else {
            this.valueFieldControl?.enable();
        }
    }

    ngOnInit() {
        this.unSub = this.valueFieldControl.valueChanges.subscribe((value) => {
            this.onChange(value);
        });
    }
    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        Object.keys(control.errors! || {}).forEach((key) => {
            if (key == 'required' || this.isRequired) {
                this.valueFieldControl.setValidators(Validators.required);
            }
        });
        return null;
    }
    ngOnDestroy(): void {
        this.unSub.unsubscribe();
    }
}
