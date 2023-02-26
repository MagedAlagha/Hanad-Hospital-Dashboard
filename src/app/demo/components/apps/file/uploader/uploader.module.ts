import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from './uploader.component';
import { FileAppService } from '../service/file.app.service';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [UploaderComponent],
  imports: [
    CommonModule,
    FileUploadModule,
    ToastModule,
  ],
  providers: [FileAppService],
  exports:[UploaderComponent]
})
export class UploaderModule { }
