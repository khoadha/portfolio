import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service'; // Update with your correct import path
import { MessageService } from 'primeng/api';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter-key',
  standalone: false,
  templateUrl: './enter-key.component.html',
  styleUrls: ['./enter-key.component.scss'],
  providers: [MessageService]
})
export class EnterKeyComponent {

  key: string = '';
  loading: boolean = false;
  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) { }

  onSubmit() {
      this.loading = true;
      this.authService.verifyPasskey(this.key).pipe(
        catchError(error => {
          this.loading = false;
          if (error.status === 401 || error.status === 400) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid passkey!' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Sai rồi', detail: 'Đừng thử, nhắn tui để lấy key cho lẹ' });
          }
          return of(null);
        })
      ).subscribe(res => {
        if (res) {
          this.authService.storeToken(res.token);
          this.router.navigate(['dashboard/profile']).then(() => {
            window.location.reload();
          })
          this.loading = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Passkey verified successfully!' });
        }
      });
  }
}