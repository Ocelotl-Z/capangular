import { Component } from '@angular/core';
import { UtilService } from './services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'capangular';

  isLogged = false;

  constructor(private utilSvcSpy: UtilService, private router: Router) {
    this.isLogged = Boolean(utilSvcSpy.getToken());
    this.utilSvcSpy.isLogged.subscribe({
      next: (value) => {
        this.isLogged = value;
      },
    });
  }

  logout() {
    this.utilSvcSpy.deleteToken();
    this.router.navigate(['login']);
  }
}
