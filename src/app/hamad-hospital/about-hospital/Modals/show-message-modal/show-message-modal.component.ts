import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AboutHospitalService } from '../../about-hospital.service';

@Component({
  selector: 'app-show-message-modal',
  templateUrl: './show-message-modal.component.html',
  styleUrls: ['./show-message-modal.component.scss']
})
export class ShowMessageModalComponent implements OnInit{
data!:any;
isEn = document.dir == 'ltr' ? true : false;

constructor(private _aboutHospitalService: AboutHospitalService){

}

ngOnInit(): void {
    this.data  = this._aboutHospitalService.dataStore.showMessageDialog?.data;
   if(this.data){
       console.log(this.data , "data data")
   }
   }
       closeDialog() {
           this._aboutHospitalService.displayDialogs(
               'showMessageDialog',
               false
           );
       }


}
