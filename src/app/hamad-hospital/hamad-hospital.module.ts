import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HamadHospitalComponent } from './hamad-hospital.component';



@NgModule({
  declarations: [HamadHospitalComponent],
  imports: [
    CommonModule ,
    RouterModule.forChild([
        {
            path: '',
            component: HamadHospitalComponent,
            children: [
                {
                    path: 'home',
                    data: { breadcrumb: 'الصفحة الرئيسية' },
                    loadChildren: () =>
                        import(
                            './home/home.module'
                        ).then((m) => m.HomeModule),
                },



            ],
        },
    ]),
  ]
})
export class HamadHospitalModule { }
