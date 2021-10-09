import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'expense-proceeds-app';

  constructor(private authSvc: AuthService) {
    this.authSvc.initAuthListeners();
  }
}
