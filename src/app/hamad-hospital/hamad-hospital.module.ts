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
                {
                    path: 'services',
                    data: { breadcrumb: 'خدمات المستشفى' },
                    loadChildren: () =>
                        import(
                            './services-page/services-page.module'
                        ).then((m) => m.ServicesPageModule),
                },
                {
                    path: 'electronic-services',
                    data: { breadcrumb: 'الخدمات الالكترونية' },
                    loadChildren: () =>
                        import(
                            './electronic-services/electronic-services.module'
                        ).then((m) => m.ElectronicServicesModule),
                },
                {
                    path: 'advertisements',
                    data: { breadcrumb: 'اعلان التوظيف' },
                    loadChildren: () =>
                        import(
                            './advertisements/advertisements.module'
                        ).then((m) => m.AdvertisementsModule),
                },
                {
                    path: 'main-info',
                    data: { breadcrumb: 'المعلومات الرئيسية' },
                    loadChildren: () =>
                        import(
                            './advertisements/advertisements.module'
                        ).then((m) => m.AdvertisementsModule),
                },



            ],
        },
    ]),
  ]
})
export class HamadHospitalModule { }
