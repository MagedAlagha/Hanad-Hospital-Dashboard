import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../shared/services/auth.service';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    menu: MenuItem[] = [];

    @ViewChild('searchinput') searchInput!: ElementRef;

    @ViewChild('menubutton') menuButton!: ElementRef;

    searchActive: boolean = false;

    constructor(public layoutService: LayoutService ,  private auth: AuthService) {}

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    activateSearch() {
        this.searchActive = true;
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
        }, 100);
    }

    deactivateSearch() {
        this.searchActive = false;
    }

    removeTab(event: MouseEvent, item: MenuItem, index: number) {
        this.layoutService.onTabClose(item, index);
        event.preventDefault();
    }

    ShowNotifications() {
        this.layoutService.showNotificationsSidebar();
    }

    get layoutTheme(): string {
        return this.layoutService.config.layoutTheme;
    }

    get colorScheme(): string {
        return this.layoutService.config.colorScheme;
    }

    get logo(): string {
        const path = 'assets/layout/images/logo-';
        const logo =
            this.layoutTheme === 'primaryColor'
                ? 'light.png'
                : this.colorScheme === 'light'
                ? 'dark.png'
                : 'light.png';
        return path + logo;
    }

    get tabs(): MenuItem[] {
        return this.layoutService.tabs;
    }

    logout(){
   this.auth.logout()
    }
}
