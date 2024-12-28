import { Component } from '@angular/core';
import { User } from '../../../core/models/external/user';
import { RandomUserService } from '../../../core/services/external/random-user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-random-user',
  standalone: false,
  templateUrl: './random-user.component.html',
  styleUrl: './random-user.component.scss',
  providers: [MessageService]
})
export class RandomUserComponent {

  user!: User;
  loading: boolean = false;

  constructor(
    private randomUserService: RandomUserService,
    private messageService: MessageService,

  ) { }


  randomUserInformation() {
    this.loading = true;
    this.randomUserService.getUser().subscribe(res => {
      this.user = res.results[0];
      this.displaySuccessMessage();
      this.loading = false;
    })
  }

  displaySuccessMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Dữ liệu đã được làm mới.',
      life: 3000
    });
  }
}
