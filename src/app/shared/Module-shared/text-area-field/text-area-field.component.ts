import { TranslationModule } from './../../../i18n/translation.module';
import { ValidationComponent } from './../validation/validation.component';
import { CommonModule } from '@angular/common';
import {
    Component,
    OnInit,
    forwardRef,
    Input,
    SimpleChanges,
    OnDestroy,
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    FormsModule,
    FormControl,
    NG_VALIDATORS,
    ReactiveFormsModule,
    AbstractControl,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        InputTextareaModule,
        FormsModule,
        ValidationComponent,
        TranslationModule,
        ReactiveFormsModule,
    ],
    selector: 'app-text-area-field',
    templateUrl: './text-area-field.component.html',
    styleUrls: ['./text-area-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextAreaFieldComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: TextAreaFieldComponent,
            multi: true,
        },
    ],
})
export class TextAreaFieldComponent
    implements OnInit, OnDestroy, ControlValueAccessor
{
    constructor(
        private messageService: MessageService,
        private _translateService: TranslateService
    ) {}
    @Input() submitted: boolean = false;
    @Input() label: string = '';
    required: boolean = false;
    disabled: boolean = false;
    @Input() autoResize: boolean = true;
    @Input() rows: number = 3;
    TextareaFieldControl = new FormControl();
    onChange: any = () => {};
    onTouch: any = () => {};
    valueChangesSubscription!: Subscription;
    writeValue(value: any) {
        this.TextareaFieldControl.setValue(value);
        if (!value && value != 0) {
            this.TextareaFieldControl.reset();
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
                this.TextareaFieldControl.setValidators(Validators.required);
            }
        });
        return null;
    }
    setDisabledState(isDisabled: boolean) {
        if (isDisabled) {
            this.TextareaFieldControl.disable();
        } else {
            this.TextareaFieldControl.enable();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['submitted']) {
            if (this.submitted && this.TextareaFieldControl.invalid) {
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
            this.TextareaFieldControl.valueChanges.subscribe((value) => {
                this.onChange(value);
            });
    }

    ngOnDestroy() {
        this.valueChangesSubscription.unsubscribe();
    }
}
