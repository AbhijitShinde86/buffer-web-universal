import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-deal-thank-you',
  templateUrl: './deal-thank-you.component.html',
  styles: [
  ]
})
export class DealThankYouComponent implements OnInit {
  private userSub:Subscription;
  
  user:User; loadPage = false;

  constructor(private authService : AuthService, private router: Router) { 
    this.userSub = this.authService.user.subscribe(user => {
      if(!(!!user)) 
        this.router.navigate([`${environment.dealsBaseUrl}/`]);
      else
        this.loadPage = true;
    });
  }

  ngOnInit(): void {
  }

  onProductsClick(){
    this.router.navigate(['/user/dashboard/purchased-deals']);
  }

  onContinueShopping(){
    this.router.navigate([`${environment.dealsBaseUrl}`]);
  }
  
  ngOnDestroy(): void {
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }

}
