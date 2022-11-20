import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styles: [
  ]
})
export class ThankYouComponent implements OnInit {

  constructor(private authService : AuthService) { 
    if(!this.authService.checkIsStillLogged()){
      this.authService.logout();
      window.location.reload();
    }
  }

  ngOnInit(): void {
  }

}
