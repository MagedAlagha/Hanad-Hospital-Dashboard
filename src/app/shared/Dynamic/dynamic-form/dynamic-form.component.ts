import { map } from 'rxjs/operators';
import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
    Output,
    EventEmitter,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit, OnChanges {
    @Input() fields: any;
    @Input() title: any;
    FieldsAfterActions: any;
    @Output() onSave = new EventEmitter();
    constructor() {}
    FormGroupDynamic: FormGroup = new FormGroup({});

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['fields']) {
            this.FormGroupDynamic = new FormGroup({});
            this.FieldsAfterActions = [];
            if (this.fields && this.fields?.length) {
                this.BuildDynamicFormForm();
            }
        }
    }
    BuildDynamicFormForm() {
        this.FieldsAfterActions = this.fields?.map((field: any) => {
            let key = 'Field_' + field.FieldId;
            this.FormGroupDynamic.addControl(
                key,
                new FormControl(field?.FieldValue)
            );
            return { ...field, key: key };
        });
    }
    save() {
        let value: any = [];
        this.FieldsAfterActions.forEach((field: any) => {
            value.push({
                fieldId: field?.FieldId,
                value: this.FormGroupDynamic.get(field?.key)?.value,
            });
        });

        this.onSave.emit(value);
    }

    ngOnInit() {}
}
