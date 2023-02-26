import { Component } from '@angular/core';
import { ProjectsService } from '../../projects.service';

@Component({
  selector: 'app-attached-files',
  templateUrl: './attached-files.component.html',
  styleUrls: ['./attached-files.component.scss']
})
export class AttachedFilesComponent {
    constructor(private _ProjectsService: ProjectsService ) {}
    closeDialog() {
        this._ProjectsService.displayDialogs('attachedFilesDialog', false);
    }
}
