import { TranslationModule } from './../../../i18n/translation.module';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import {
    Component,
    forwardRef,
    Input,
    OnInit,
    Output,
    EventEmitter,
    Renderer2,
    OnChanges,
    SimpleChanges,
    OnDestroy,
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    FormsModule,
    FormControl,
    ReactiveFormsModule,
    AbstractControlDirective,
    ValidationErrors,
    Validators,
    Validator,
    AbstractControl,
    NG_VALIDATORS,
} from '@angular/forms';
import { ValidationComponent } from '../validation/validation.component';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        ValidationComponent,
        TranslationModule,
        ReactiveFormsModule,
    ],
    selector: 'app-input-field',
    templateUrl: './input-field.component.html',
    styleUrls: ['./input-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputFieldComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: InputFieldComponent,
            multi: true,
        },
    ],
})
export class InputFieldComponent
    implements OnInit, OnDestroy, ControlValueAccessor, Validator, OnChanges
{
    required: boolean = false;
    @Input() submitted: boolean = false;
    @Input() label: string = '';
    disabled: boolean = false;
    inputFieldControl = new FormControl();
    valueChangesSubscription!: Subscription;
    constructor(
        private messageService: MessageService,
        private _translateService: TranslateService
    ) {}
    onChange: any = () => {};
    onTouch: any = () => {};
    writeValue(value: any) {
        this.inputFieldControl.setValue(value);
        if (!value && value != 0) {
            this.inputFieldControl.reset();
        }
    }
    registerOnChange(fn: any) {
        this.onChange = fn;
    }
    registerOnTouched(fn: any) {
        this.onTouch = fn;
    }
    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        Object.keys(control.errors! || {}).forEach((key) => {
            if (key == 'required') {
                this.required = true;
                this.inputFieldControl.setValidators(Validators.required);
            }
        });
        return null;
    }
    setDisabledState(isDisabled: boolean) {
        if (isDisabled) {
            this.inputFieldControl.disable();
        } else {
            this.inputFieldControl.enable();
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['submitted']) {
            if (this.submitted && this.inputFieldControl.invalid) {
                this.messageService.add({
                    severity: 'error',
                    summary: `${this._translateService.instant(
                        this.label
                    )} ${this._translateService.instant('Shared.IS_REQUIRED')}`,
                    detail: '',
                });
            }
        }
    }

    ngOnInit() {
        this.valueChangesSubscription =
            this.inputFieldControl.valueChanges.subscribe((value) => {
                this.onChange(value);
            });
    }

    ngOnDestroy() {
        this.valueChangesSubscription.unsubscribe();
    }
}
