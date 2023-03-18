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
noData:any;
constructor(private _electronicServicesService:ElectronicServicesService){

}


ngOnInit(): void {
 this.data  = this._electronicServicesService.dataStore.showMessageDialog?.data;
if(this.data){
    console.log(this.data , "data data")
    if(this.data.TextMessage ===''){
        this.noData = 'لا توجد رسالة'
    }
}
}
    closeDialog() {
        this._electronicServicesService.displayDialogs(
            'showMessageDialog',
            false
        );
    }
}
