import { Component, OnInit } from '@angular/core';
import { Profile } from '../../../core/models/profile';
import { ProfileService } from '../../../core/services/profile.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-profile',
  standalone: false,
  providers: [MessageService],
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss']
})
export class ManageProfileComponent implements OnInit {

  profile!: Profile;

  constructor(
    private profileService: ProfileService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.profileService.getProfile().subscribe(res => {
      this.profile = res;
    });
  }

  save() {
    this.profileService.updateProfile(this.profile).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Profile updated successfully.',
        life: 3000
      });
      this.fetchData();
    });
  }

}
