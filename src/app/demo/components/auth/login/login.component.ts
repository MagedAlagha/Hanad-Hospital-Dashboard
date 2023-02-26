import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

	constructor(private layoutService: LayoutService) {}

	get filledInput(): boolean {
		return this.layoutService.config.inputStyle === 'filled';
	}
	loginDropdown =new FormControl();
	userID!:string;
	login(){
		/* localStorage.setItem('client', 'client');
		localStorage.setItem('employee', 'employee');
		localStorage.setItem('admin', 'admin');
		localStorage.setItem('managment', 'managment');  */
		localStorage.setItem('login', this.userID); 
	}

	ngOnInit() {
       
		this.loginDropdown.valueChanges.subscribe(x => {
			this.userID = x ;
		 })
    }

	
}
