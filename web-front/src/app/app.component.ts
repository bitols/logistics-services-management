import { Component } from '@angular/core';
import { SessionsService } from './services/sessions.service';
import { SendersService } from './services/senders.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  collapsed = true;
  isLoggedIn = false;
  errorMessage?: string;

  id?: string;
  email?: string;
  senderId?: string;
  sender?: string;

  token?: string;

  constructor(private sessionsService: SessionsService, private sendersService: SendersService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.sessionsService.isLoggedIn();

    if (this.isLoggedIn) {
      const access = this.sessionsService.getUser();
      this.id = access.id;
      this.email = access.email;
      this.senderId = access.senderId;
      this.sendersService.get(access.senderId).subscribe({
        next: data => {
          this.sender= data.name;
        },
        error: err => {
          this.errorMessage = err.error.message;
        }
      })
    }
  }
}
