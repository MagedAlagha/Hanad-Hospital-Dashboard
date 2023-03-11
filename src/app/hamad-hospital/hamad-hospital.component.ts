import { Component, OnInit } from '@angular/core';
import { HomeService } from './home/home.service';
import { UsersService } from './users/users.service';

@Component({
  selector: 'app-hamad-hospital',
  templateUrl: './hamad-hospital.component.html',
  styleUrls: ['./hamad-hospital.component.scss']
})
export class HamadHospitalComponent implements OnInit {
constructor(private _usersService:UsersService ){

}

ngOnInit(): void {
    this._usersService.getUsers();

}
}
