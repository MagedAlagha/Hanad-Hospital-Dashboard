import { TicketComponent } from './ticket.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponentComponent } from '../../../shared/Module-shared/button-component/button-component.component';
import { RouterModule } from '@angular/router';
import { EditorModule } from 'primeng/editor';
import { InputFieldComponent } from 'src/app/shared/Module-shared/input-field/input-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteFeildComponent } from 'src/app/shared/Module-shared/auto-complete-feild/auto-complete-feild.component';
import { CalenderFeildComponent } from 'src/app/shared/Module-shared/calender-feild/calender-feild.component';
import { DialogSharedComponent } from 'src/app/shared/Module-shared/dialog-shared/dialog-shared.component';
import { EditorFieldComponent } from 'src/app/shared/Module-shared/editor-field/editor-field.component';
import { IconSharedComponent } from 'src/app/shared/Module-shared/icon-shared/icon-shared.component';
import { InputNumberFieldComponent } from 'src/app/shared/Module-shared/input-number-field/input-number-field.component';
import { MultiSelectFieldComponent } from 'src/app/shared/Module-shared/multi-select-field/multi-select-field.component';
import { SearchFieldComponent } from 'src/app/shared/Module-shared/search-field/search-field.component';
import { SelectFieldComponent } from 'src/app/shared/Module-shared/select-field/select-field.component';
import { TextAreaFieldComponent } from 'src/app/shared/Module-shared/text-area-field/text-area-field.component';
import { TableModule } from 'primeng/table';
import { CheckBoxComponent } from 'src/app/shared/Module-shared/check-box/check-box.component';
import { AccordionModule } from 'primeng/accordion';
import { ReplayTicketModalComponent } from './Modals/replay-ticket-modal/replay-ticket-modal.component';

@NgModule({
    declarations: [TicketComponent, ReplayTicketModalComponent],
    imports: [
        CommonModule,
        ButtonComponentComponent,
        EditorModule,
        RouterModule.forChild([
            {
                path: '',
                component: TicketComponent,
            },
        ]),
        ButtonComponentComponent,
        InputFieldComponent,
        IconSharedComponent,
        DialogSharedComponent,
        CalenderFeildComponent,
        SelectFieldComponent,
        InputNumberFieldComponent,
        EditorFieldComponent,
        SearchFieldComponent,
        TextAreaFieldComponent ,
        ReactiveFormsModule ,
        TableModule ,
        CheckBoxComponent,
        AccordionModule
    ],
})
export class TicketModule {}
