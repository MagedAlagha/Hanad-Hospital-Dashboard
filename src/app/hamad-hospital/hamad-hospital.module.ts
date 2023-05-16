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
                    data: { breadcrumb: 'إعلانات' },
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
                            './main-info/main-info.module'
                        ).then((m) => m.MainInfoModule),
                },
                {
                    path: 'about',
                    data: { breadcrumb: 'المعلومات الرئيسية' },
                    loadChildren: () =>
                        import(
                            './about-hospital/about-hospital.module'
                        ).then((m) => m.AboutHospitalModule),
                },
                {
                    path: 'media-center',
                    data: { breadcrumb: 'المركز الاعلامي' },
                    loadChildren: () =>
                        import(
                            './media-center/media-center.module'
                        ).then((m) => m.MediaCenterModule),
                },
                {
                    path: 'users',
                    data: { breadcrumb: 'المستخدمين' },
                    loadChildren: () =>
                        import(
                            './users/users.module'
                        ).then((m) => m.UsersModule),
                },
                {
                    path: 'permissions',
                    data: { breadcrumb: 'الصلاحيات' },
                    loadChildren: () =>
                        import(
                            './permissions/permissions.module'
                        ).then((m) => m.PermissionsModule),
                },
                {
                    path: 'codes',
                    data: { breadcrumb: 'ثوابت النظام' },
                    loadChildren: () =>
                        import(
                            './codes/codes.module'
                        ).then((m) => m.CodesModule),
                },

            ],
        },
    ]),
  ]
})
export class HamadHospitalModule { }
