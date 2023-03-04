import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ElectronicServicesService } from '../../electronic-services.service';

@Component({
  selector: 'app-show-message-modal',
  templateUrl: './show-message-modal.component.html',
  styleUrls: ['./show-message-modal.component.scss']
})
export class ShowMessageModalComponent  implements OnInit{
data:any;
constructor(private _electronicServicesService:ElectronicServicesService){

}


ngOnInit(): void {
 this.data  = this._electronicServicesService.dataStore.showMessageDialog?.data;
if(this.data){
    console.log(this.data , "data data")
}
}
    closeDialog() {
        this._electronicServicesService.displayDialogs(
            'showMessageDialog',
            false
        );
    }
}
