import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../../core/models/profile';
import { ProfileService } from '../../core/services/profile.service';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/models/project';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  profile!: Profile;
  projects: Project[] = [];

  skills: string[] = [];
  constructor(
    private router: Router,
    private profileService: ProfileService,
    private projectService: ProjectService) { }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(res => {
      this.profile = res;
      this.skills = res.skills!.split(',');
    })
    this.projectService.getProjects().subscribe(res => {
      this.projects = res.map(project => {
        project.skillsArray = project.skills!.split(',');
        return project;
      });
    });
  }

  onClickSocialMedia(name: string) {
    let routerLink = '';
    switch (name) {
      case 'github':
        routerLink = this.profile.githubUrl!;
        break;
      case 'linkedin':
        routerLink = this.profile.linkedinUrl!;
        break;
      case 'facebook':
        routerLink = this.profile.facebookUrl!;
        break;
    }
    window.open(routerLink)
  }

  onClickOpenProject(project: Project) {
    const routerLink = '/project/';
    this.router.navigate([`${routerLink}${project.id}`]);
  }

}
