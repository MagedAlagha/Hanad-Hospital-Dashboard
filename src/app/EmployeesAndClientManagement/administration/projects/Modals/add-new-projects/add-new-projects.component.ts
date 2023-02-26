import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProjectsService } from '../../projects.service';

@Component({
    selector: 'app-add-new-projects',
    templateUrl: './add-new-projects.component.html',
    styleUrls: ['./add-new-projects.component.scss'],
})
export class AddNewProjectsComponent implements OnInit {
    addProjectForm:FormGroup;
    title:any = "إنشاء مشروع جديد";
    addTasks:boolean =  false ;
    dataTable:any [] = [];
    hideBtns:boolean =  true;
    constructor(private _ProjectsService: ProjectsService , fb:FormBuilder) {
        this.addProjectForm = fb.group({
            Id:[''],
            ProjectName:[''],
            ProjectID:[''],
            LocationWAN:[''],
            LocationLAN:[''],
            StartProject:[''],
            EndTimeProject:[''],
            Notes:[''],
        })
    }
    select =new FormControl();
    ngOnInit() {
      this.dataTable = this._ProjectsService.getAllTask();
     const data = this._ProjectsService.dataStore.DisplayProjectsDialog?.data
      if (data) {
        this.addProjectForm.patchValue(data);
        this.addProjectForm.get('ProjectID')?.disable();
        this.title = ` تعديل بيانات مشروع ( ${data.ProjectName} )`
        this.addTasks = true;

        /* Strat show Data Modal */
        if(data.showData){
            this.title = ` عرض بيانات مشروع ( ${data.ProjectName} )`
           this.addProjectForm?.disable();
           this.addTasks = false;
           this.hideBtns = false
        }else{
            this.hideBtns = true
        }
        /*  End show Data Modal */

    }


    }

    closeDialog() {
        this._ProjectsService.displayDialogs('DisplayProjectsDialog', false);
    }


    addtasksDialog(item?: any) {
        this._ProjectsService.displayDialogs(
            'tasksDialog',
            true,
            item
        );
        console.log(item)
    }
    attachedFilesDialog(item?: any) {
        this._ProjectsService.displayDialogs(
            'attachedFilesDialog',
            true,
            item
        );
    }
}
