import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectsService } from './projects.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
    DisplayProjectsDialog$!: Observable<any>;
    tasksDialog$!: Observable<any>;
    attachedFilesDialog$!: Observable<any>;
    dataTable: any[] = [];
    showData:boolean = false;
    select =new FormControl();
    calendarOptions: any;
    constructor(private _ProjectsService: ProjectsService) {}
    ngOnInit() {
        this.dataTable = this._ProjectsService.getAll();
        this.DisplayProjectsDialog$ = this._ProjectsService.Selector$(
            'DisplayProjectsDialog'
        );
        this.tasksDialog$ = this._ProjectsService.Selector$(
            'tasksDialog'
        );
        this.attachedFilesDialog$ = this._ProjectsService.Selector$(
            'attachedFilesDialog'
        );


    this.calendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialDate: '2019-01-01',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true
    };



    }

    addFormDataDialog(item?: any) {
        this._ProjectsService.displayDialogs(
            'DisplayProjectsDialog',
            true,
            item
        );
    }
    showFormDataDialog(item?: any) {
        this._ProjectsService.displayDialogs(
            'DisplayProjectsDialog',
            true,
            {...item , showData:this.showData = true }
        );
    }


}
