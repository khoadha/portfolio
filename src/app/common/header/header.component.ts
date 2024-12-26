import { Component, effect, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/models/project';
import { AuthService } from '../../core/services/auth.service';
@Component({
    selector: 'app-header',
    standalone: false,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

    darkMode = signal(false);  // Signal to track dark mode
    isDark: boolean = false;

    projects: Project[] = [];
    items: MenuItem[] | undefined;
    isLogged: boolean = false;

    applyDarkMode = effect(() => {
        const darkMode = this.darkMode();
        
        localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
        
        if (darkMode) {
            this.isDark = true;
            document.documentElement.classList.add('dark-mode');
        } else {
            this.isDark = false;
            document.documentElement.classList.remove('dark-mode');
        }
    });

    constructor(private projectService: ProjectService, private auth: AuthService) { }

    ngOnInit() {
        this.isLogged = this.auth.isLoggedIn();

        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        this.darkMode.set(savedDarkMode);
        this.projectService.getProjects().subscribe(res => {
            this.projects = res;
            this.initLabelData();
        });
    }

    initLabelData() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                routerLink: '/'
            },
            {
                label: 'History',
                icon: 'pi pi-briefcase',
                routerLink: 'history'
            },
            {
                label: 'Blog',
                icon: 'pi pi-pen-to-square',
                routerLink: 'blog'
            },
            {
                label: 'Project',
                icon: 'pi pi-desktop',
                items: this.projects.map(project => ({
                    label: project.name,
                    icon: 'pi pi-star-fill',
                    routerLink: `project/${project.id}`
                }))
            }
        ];
    }

    onSignOut() {
        this.auth.logOut();
    }
}
