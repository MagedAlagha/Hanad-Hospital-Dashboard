import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit {

    formSlider:FormGroup;

    constructor(fb:FormBuilder) {
        this.formSlider = fb.group({
            ID:[''],
            Image:[''],
            TitleAr:[''],
            TitleEn:[''],
            Sorting:[''],
            IsActive:[''],
        })
     }

    ngOnInit() {
    }

    save(){
   console.log(this.formSlider.value , "gegegegeg");
    }

        checked: boolean | undefined;


}
