import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-deal-new-thankyou',
  templateUrl: './deal-new-thankyou.component.html',
  styles: [
  ]
})
export class DealNewThankyouComponent implements OnInit {

  constructor(private authService : AuthService) { 
    if(!this.authService.checkIsStillLogged()){
      this.authService.logout();
      window.location.reload();
    }
  }

  ngOnInit(): void {
  }

}
