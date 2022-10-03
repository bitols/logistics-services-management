import { Component } from '@angular/core';
import { SessionsService } from './services/sessions.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;

  id?: string;
  email?: string;
  senderId?: string;
  token?: string;

  constructor(private sessionsService: SessionsService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.sessionsService.isLoggedIn();

    if (this.isLoggedIn) {
      const access = this.sessionsService.getUser();
      this.id = access.id;
      this.email = access.email;
      this.senderId = access.senderId;
      this.token = access.token;
    }
  }
}
