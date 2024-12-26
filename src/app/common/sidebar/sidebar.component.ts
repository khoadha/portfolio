import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-sidebar',
    standalone: false,

    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
    items: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            {
                label: 'Profile',
                icon: 'pi pi-user',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pi pi-user-edit',
                        routerLink: '/dashboard/profile'
                    }
                ],
                expanded: true
            },
            {
                label: 'Blogs',
                icon: 'pi pi-pen-to-square',
                items: [
                    {
                        label: 'List',
                        icon: 'pi pi-list-check',
                        routerLink: '/dashboard/blog'
                    },
                    {
                        label: 'Categories',
                        icon: 'pi pi-bars',
                        routerLink: '/dashboard/category'
                    }
                ],
                expanded: false
            },
            {
                label: 'Projects',
                icon: 'pi pi-desktop',
                items: [
                    {
                        label: 'List',
                        icon: 'pi pi-list-check',
                        routerLink: '/dashboard/project'
                    },
                ],
                expanded: false
            },
            {
                label: 'Employment History',
                icon: 'pi pi-briefcase',
                items: [
                    {
                        label: 'List',
                        icon: 'pi pi-list-check',
                        routerLink: '/dashboard/history'
                    }
                ],
                expanded: false
            },
        ]
    }
}
