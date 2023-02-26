import { AddNewProjectsComponent } from './Modals/add-new-projects/add-new-projects.component';
import { AccordionModule } from 'primeng/accordion';
import { SpinnerLoadingComponent } from 'src/app/shared/Module-shared/spinner-loading/spinner-loading.component';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckBoxComponent } from 'src/app/shared/Module-shared/check-box/check-box.component';
import { TranslationModule } from 'src/app/i18n/translation.module';
import { SearchFieldComponent } from 'src/app/shared/Module-shared/search-field/search-field.component';
import { DialogSharedComponent } from 'src/app/shared/Module-shared/dialog-shared/dialog-shared.component';
import { IconSharedComponent } from 'src/app/shared/Module-shared/icon-shared/icon-shared.component';
import { ButtonComponentComponent } from 'src/app/shared/Module-shared/button-component/button-component.component';
import { ButtonModule } from 'primeng/button';
import { InputNumberFieldComponent } from 'src/app/shared/Module-shared/input-number-field/input-number-field.component';
import { DialogModule } from 'primeng/dialog';
import { SelectFieldComponent } from 'src/app/shared/Module-shared/select-field/select-field.component';
import { CalenderFeildComponent } from './../../../shared/Module-shared/calender-feild/calender-feild.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from 'src/app/shared/Module-shared/input-field/input-field.component';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { TextAreaFieldComponent } from 'src/app/shared/Module-shared/text-area-field/text-area-field.component';
import { TasksModalComponent } from './Modals/tasks-modal/tasks-modal.component';
import { ToastModule } from 'primeng/toast';
import { UploaderModule } from 'src/app/demo/components/apps/file/uploader/uploader.module';
import { AttachedFilesComponent } from './Modals/attached-files/attached-files.component';
import {ImageModule} from 'primeng/image';
import {ProgressBarModule} from 'primeng/progressbar';
import {TabViewModule} from 'primeng/tabview';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ProjectsComponent,
            },
        ]),
        TableModule,
        InputFieldComponent,
        ReactiveFormsModule,
        CalenderFeildComponent,
        SelectFieldComponent,
        DialogModule,
        InputNumberFieldComponent,
        ButtonModule,
        ButtonComponentComponent,
        IconSharedComponent,
        DialogSharedComponent,
        SearchFieldComponent,
        TranslationModule,
        FormsModule,
        FileUploadModule,
        CheckBoxComponent,
        SpinnerLoadingComponent,
        AccordionModule,
        TextAreaFieldComponent,
        ToastModule ,
        UploaderModule,
        ImageModule ,
        ProgressBarModule,
        TabViewModule,
        FullCalendarModule

    ],
    declarations: [ProjectsComponent, AddNewProjectsComponent, TasksModalComponent, AttachedFilesComponent],
})
export class ProjectsModule {}
