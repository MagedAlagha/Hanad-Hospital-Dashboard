import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProjectsService } from '../../projects.service';

@Component({
  selector: 'app-tasks-modal',
  templateUrl: './tasks-modal.component.html',
  styleUrls: ['./tasks-modal.component.scss'] ,
  providers: [MessageService] ,
})
export class TasksModalComponent  implements OnInit  {
    select =new FormControl();
    title:any ;
    tasksForm:FormGroup;
    constructor(private _ProjectsService: ProjectsService , private messageService: MessageService , fb:FormBuilder) {
        this.tasksForm = fb.group({
            TaskName:[''],
            TaskType:[''],
            Section:[''],
            visible:[''],
        })
    }

   ngOnInit() {
     const data = this._ProjectsService.dataStore.tasksDialog?.data
     const data_project = this._ProjectsService.dataStore.DisplayProjectsDialog?.data
      if (data) {
        this.tasksForm.patchValue({
            ...data ,
            TaskType : { Code: data.id, Name: data.TaskType } ,
            Section :  { Code: data.id, Name: data.Section } ,

        });
        this.title = `  تعديل مهمة  ( ${data.TaskName} )  لمشروع  ( ${data_project.ProjectName} )`
    }  else{
        this.title = ` اضافة مهام ل مشروع  ( ${data_project.ProjectName} )`
    }
    }
    closeDialog() {
        this._ProjectsService.displayDialogs('tasksDialog', false);
    }
    sections: any[]= [
        { Name:"HR - قسم محاسبه" , Code:1},
        { Name:"قسم المساحة" , Code:2},
        { Name:"قسم الرسام" , Code:3},
        { Name:"قسم المعماري" , Code:4},
        { Name:"قسم الانشائي" , Code:5},
        { Name:"قسم التصميم الداخلي" , Code:6},
        { Name:"قسم الكهرباء والميكانيكا" , Code:7},
    ]
    tasks: any[]= [
        { Name:"اصدار قرار مساحي" , Code:1},
        { Name:"تثبيت الموقع" , Code:2},
        { Name:"فرز الاراضي" , Code:3},
        { Name:"فرز الوحدات السكنية" , Code:4},
        { Name:"دمج الاراضي" , Code:5},
        { Name:"رفع مساحي" , Code:6},
        { Name:"طلبات منصة احكام" , Code:7},
        { Name:"تحديث الصك" , Code:8},
        { Name:"شهادة اتمام بناء" , Code:9},
        { Name:"حساب كميات" , Code:10},
        { Name:"تقديم التامين" , Code:11},
        { Name:"تصميم الفكره" , Code:12},
        { Name:"تصميم الواجهه" , Code:13},
        { Name:"توزيع الاعمده" , Code:14},
        { Name:"تجهيز المشروع" , Code:15},
        { Name:"تصميم انشائي" , Code:16},
        { Name:"MEP" , Code:17},
        { Name:"الكتروميكانيك" , Code:18},
        { Name:"mood board" , Code:19},
        { Name:"تصميم داخلي اولي" , Code:20},
        { Name:"رسوم تقصيليه" , Code:21},
        { Name:"تحديد موعد مع العميل" , Code:22},
        { Name:"تحصيل الدفعه" , Code:23},
        { Name:"استخراج الرخصه" , Code:24},
        { Name:"اشراف" , Code:25},
        { Name:"معاينة موقع" , Code:26},
        { Name:"اخرى" , Code:27},
    ]



    /* ******************** */

    uploadedFiles: any[] = [];

    @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;



    onUpload(event: any) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully' });
    }

    onImageMouseOver(file: Image) {
        this.buttonEl.toArray().forEach((el: { nativeElement: { id: string; style: { display: string; }; }; }) => {
            el.nativeElement.id === file.name ? el.nativeElement.style.display = 'flex' : null;
        })
    }

    onImageMouseLeave(file: Image) {
        this.buttonEl.toArray().forEach((el: { nativeElement: { id: string; style: { display: string; }; }; }) => {
            el.nativeElement.id === file.name ? el.nativeElement.style.display = 'none' : null;
        })
    }

    removeImage(event: Event, file: any) {
        event.stopPropagation();
        this.uploadedFiles = this.uploadedFiles.filter(i => i !== file);
    }

    /* ******************** */



}
interface Image {
    name: string;
    objectURL: string;
}
