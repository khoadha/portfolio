import { Component, effect, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/models/project';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  darkMode = signal(false); // signal to track dark mode state
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

  constructor(private projectService: ProjectService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.isLogged = this.auth.isLoggedIn();

    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    this.darkMode.set(savedDarkMode);

    this.projectService.getProjects().subscribe(res => {
      this.projects = res;
      this.initLabelData();
    });

    this.router.events.subscribe(() => {
      this.initLabelData();
    });
  }

  initLabelData() {
    const activeRouteClass = 'active';
    const currentRoute = location.pathname;
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/',
        styleClass: currentRoute === '/' ? activeRouteClass : '',
      },
      {
        label: 'History',
        icon: 'pi pi-briefcase',
        routerLink: '/history',
        styleClass: currentRoute === '/history' ? activeRouteClass : '',
      },
      {
        label: 'Blog',
        icon: 'pi pi-pen-to-square',
        routerLink: '/blog',
        styleClass: currentRoute === '/blog' ? activeRouteClass : '',
      },
      {
        label: 'Project',
        icon: 'pi pi-desktop',
        items: this.projects.map(project => ({
          label: project.name,
          icon: project.teamSize === 1 || (project.name && project.name.includes('Vitacare')) ? 'pi pi-star-fill' : '',
          routerLink: `/project/${project.id}`,
          styleClass: currentRoute === `/project/${project.id}` ? activeRouteClass : '',
        })),
      },
      {
        label: 'Tools',
        icon: 'pi pi-wrench',
        items: [
          {
            label: 'Tra cứu quốc gia',
            icon: 'pi pi-globe',
            routerLink: '/tools/country',
            styleClass: currentRoute === '/tools/country' ? activeRouteClass : '',
          },
          {
            label: 'Thông tin thời tiết',
            icon: 'pi pi-cloud',
            routerLink: '/tools/weather',
            styleClass: currentRoute === '/tools/weather' ? activeRouteClass : '',
          },
          {
            label: 'Lấy dữ liệu giả',
            icon: 'pi pi-chart-line',
            routerLink: '/tools/random-user',
            styleClass: currentRoute === '/tools/random-user' ? activeRouteClass : '',
          },
          {
            label: 'Chuyển đổi tiền tệ',
            icon: 'pi pi-money-bill',
            routerLink: '/tools/currency-exchange',
            styleClass: currentRoute === '/tools/currency-exchange' ? activeRouteClass : '',
          },
        ]
      },
    ];
  }

  onSignOut() {
    this.auth.logOut();
  }
}
