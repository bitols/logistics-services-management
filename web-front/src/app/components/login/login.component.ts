import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthService } from '../../services/auth.service';
import { SessionsService } from '../../services/sessions.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private sessionsService: SessionsService,
    private notificationService: NotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.sessionsService.isLoggedIn()) {
      this.router.navigate(['/'])
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: data => {
        this.sessionsService.saveCredentials(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.notificationService.showSuccess('Accepted credentials','Login sucess')
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.isLoggedIn = false;
        this.notificationService.showError(this.errorMessage,'Login failed');
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
