import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PermissionsService } from '../hamad-hospital/permissions/permissions.service';
import { MenuService } from './app.menu.service';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: MenuItem[] = [];

    constructor(
        public layoutService: LayoutService,
        private _menuService: MenuService
    ) {}

    ngOnInit() {
        var user = JSON.parse(localStorage.getItem('CurrentUser')!);
        var UserID = JSON.parse(localStorage.getItem('UserID')!);
        console.log("user" , user);
        console.log("UserID" , UserID);
        this._menuService.getPermissionsForUser(UserID);
        this._menuService.permissions$.subscribe((permissions) => {
            this.model = [
                {
                    label: 'الإحصائيات',
                    icon: 'pi pi-home',
                    items: [
                        {
                            id: '9',

                            label: 'الإحصائيات',
                            icon: 'pi pi-chart-line',
                            routerLink: ['/'],
                        },
                        // {
                        //     label: 'Sales',
                        //     icon: 'pi pi-chart-bar',
                        //     routerLink: ['/dashboard-sales'],
                        // },
                    ],
                },
                {
                    label: 'الادارة',
                    icon: 'pi pi-home',
                    items: [
                        {
                            id: '8',

                            label: 'المستخدمين',
                            icon: 'pi pi-users',
                            routerLink: ['/hamad-hospital/users'],
                        },
                        {
                            id: '8',

                            label: 'الصلاحيات',
                            icon: 'pi pi-cog',
                            routerLink: ['/hamad-hospital/permissions'],
                        },
                        {
                            id: '8',

                            label: 'ثوابت النظام',
                            icon: 'pi pi-code',
                            routerLink: ['/hamad-hospital/codes'],
                        },
                    ],
                },
                {
                    label: 'الخدمات الالكترونية',
                    icon: 'pi pi-home',
                    items: [
                        {
                            id: '7',

                            label: 'الطلبات الواردة',
                            icon: 'pi pi-th-large',
                            routerLink: ['/hamad-hospital/electronic-services'],
                        },
                    ],
                },
                {
                    label: 'صفحات الموقع',
                    icon: 'pi pi-home',
                    items: [
                        {
                            id: '1',

                            label: ' الصفحة الرئيسية',
                            icon: 'pi pi-home',
                            routerLink: ['/hamad-hospital/home'],
                        },
                        {
                            id: '2',

                            label: ' خدمات المستفى',
                            icon: 'pi pi-slack',
                            routerLink: ['/hamad-hospital/services'],
                        },

                        {
                            id: '3',

                            label: 'اعلان التوظيف',
                            icon: 'pi pi-compass',
                            routerLink: ['/hamad-hospital/advertisements'],
                        },
                        {
                            id: '4',

                            label: 'اعدادات الموقع',
                            icon: 'pi pi-box',
                            routerLink: ['/hamad-hospital/main-info'],
                        },
                        {
                            id: '5',

                            label: 'حول المستشفى',
                            icon: 'pi pi-star ',
                            routerLink: ['/hamad-hospital/about'],
                        },
                        {
                            id: '6',
                            label: 'المركز الاعلامي',
                            icon: 'pi pi-images',
                            routerLink: ['/hamad-hospital/media-center'],
                        },
                    ],
                },
            ];
            if (permissions && permissions?.length) {
                this.model.forEach((value) => {
                    value?.items?.forEach((item) => {
                        if (
                            !permissions?.find((x: any) => x.ID == item.id)
                                ?.Checked
                        ) {
                            item.visible = false;
                        }
                    });
                    if (!value?.items?.find((item) => item?.visible != false)) {
                        value.visible = false;
                    }
                });
            }
        });
    }
}
