import { skipLast, tap, take, filter } from 'rxjs/operators';
import { Subscription, startWith, Subject, ReplaySubject } from 'rxjs';
import { TranslationModule } from './../../../i18n/translation.module';
import { CommonModule } from '@angular/common';
import {
    Component,
    Input,
    OnInit,
    forwardRef,
    Output,
    EventEmitter,
    SimpleChanges,
    OnDestroy,
} from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    FormControl,
    FormsModule,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ValidationComponent } from '../validation/validation.component';
import { SpinnerLoadingComponent } from '../spinner-loading/spinner-loading.component';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        DropdownModule,
        FormsModule,
        ValidationComponent,
        TranslationModule,
        SpinnerLoadingComponent,
        ReactiveFormsModule,
    ],
    selector: 'app-select-field',
    templateUrl: './select-field.component.html',
    styleUrls: ['./select-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectFieldComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: SelectFieldComponent,
            multi: true,
        },
    ],
})
export class SelectFieldComponent
    implements OnInit, OnDestroy, ControlValueAccessor
{
    @Input() doActionSelectWhenSetValue: boolean = false;
    @Input() submitted: boolean = false;
    @Input() label: string = '';
    required: boolean = false;
    @Input() dropdownItems: any[] = [];
    @Input() optionLabel: string = 'Name';
    @Input() optionValue: string = 'Code';
    @Input() filter: boolean = false;
    @Input() loading: boolean = false;
    @Input() emptyOption: boolean = false;
    @Input() isLabel: boolean = true;
    @Input() placeholder: string = 'اختيار';

    @Output() onSelectionChange = new EventEmitter<any>();
    Destroied: boolean = false;
    dropdownItemsForComponent: any = [];
    selectFieldControl = new FormControl();
    valueChangesSubscription!: Subscription;
    constructor(
        private messageService: MessageService,
        private _translateService: TranslateService
    ) {}
    onChange: any = () => {};
    onTouch: any = () => {};
    IsDefault: boolean = false;
    canReset: boolean = false;
    onChanges = new ReplaySubject<SimpleChanges>();

    writeValue(value: any) {
        if (value || value == 0) {
            if (typeof value == 'string') {
                this.selectFieldControl.setValue(+value);
                if (this.doActionSelectWhenSetValue) {
                    this.Change(value);
                }
            } else {
                this.selectFieldControl.setValue(value);
                if (this.doActionSelectWhenSetValue) {
                    this.Change(value);
                }
            }
        }

        if (!value && value != 0) {
            if (this.canReset) {
                this.selectFieldControl.reset();
            } else {
                this.canReset = true;
            }
        }
        this.isDefualtFun();
    }
    registerOnChange(fn: any) {
        this.onChange = fn;
        this.onChanges
            .pipe(
                tap((changes) => {
                    if (changes['dropdownItems']) {
                        if (this.dropdownItems) {
                            this.dropdownItemsForComponent = [
                                ...this.dropdownItems,
                            ];
                        }
                        if (
                            this.dropdownItemsForComponent &&
                            this.dropdownItemsForComponent.length >= 6
                        ) {
                            this.filter = true;
                        }
                        if (
                            this.dropdownItemsForComponent &&
                            this.dropdownItemsForComponent.length > 0 &&
                            this.emptyOption
                        ) {
                            let emptyValue = `{"${this.optionLabel}": "غير محدد","${this.optionValue}":null }`;
                            this.dropdownItemsForComponent.unshift(
                                JSON.parse(emptyValue)
                            );
                        }
                        this.isDefualtFun();
                    }
                }),
                filter(() => !this.Destroied),
                tap((changes) => {
                    if (changes['submitted']) {
                        if (this.submitted && this.selectFieldControl.invalid) {
                            this.messageService.add({
                                severity: 'error',
                                summary: `${this._translateService.instant(
                                    this.label
                                )} ${this._translateService.instant(
                                    'Shared.IS_REQUIRED'
                                )}`,
                                detail: '',
                            });
                        }
                    }
                })
            )
            .subscribe();
    }
    registerOnTouched(fn: any) {
        this.onTouch = fn;
    }
    Change($event: any) {
        this.onChange($event);
        const dataSelected = this.dropdownItems.find(
            (value) => value[this.optionValue] == $event
        );
        this.onSelectionChange.emit(dataSelected);
    }

    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        Object.keys(control.errors! || {}).forEach((key) => {
            if (key == 'required') {
                this.required = true;
                this.selectFieldControl.setValidators(Validators.required);
            }
        });
        return null;
    }

    setDisabledState(isDisabled: boolean) {
        if (isDisabled) {
            this.selectFieldControl.disable();
        } else {
            this.selectFieldControl.enable();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.onChanges.next(changes);
    }
    isDefualtFun() {
        if (!this.IsDefault) {
            if (
                this.dropdownItemsForComponent &&
                this.dropdownItemsForComponent.length > 1
            ) {
                this.dropdownItemsForComponent.map((element: any) => {
                    if (element?.IsDefault) {
                        if (this.selectFieldControl.value != element.Code) {
                            this.selectFieldControl.setValue(element.Code);
                            this.IsDefault = true;
                            this.onSelectionChange.emit(element);
                        }
                    }
                });
            } else if (
                this.dropdownItemsForComponent &&
                this.dropdownItemsForComponent.length == 1
            ) {
                this.selectFieldControl.setValue(
                    this.dropdownItemsForComponent[0][this.optionValue]
                );
                this.IsDefault = true;
                this.onSelectionChange.emit(this.dropdownItemsForComponent[0]);
            }
        }
    }
    ngOnInit() {
        this.valueChangesSubscription =
            this.selectFieldControl.valueChanges.subscribe((value) => {
                this.onChange(value);
            });
    }

    ngOnDestroy() {
        this.Destroied = true;
        this.valueChangesSubscription?.unsubscribe();
        this.onChanges.complete();
    }
}
