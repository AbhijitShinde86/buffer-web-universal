import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

import { UrlService } from './shared/url.service';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './shared/logging.service';
import { BehaviorSubject } from 'rxjs';


export interface Response{
  status:{
    code:number
    message: string
  },
  data:any | null 
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  previousUrl: string = null;
  currentUrl: string = null;

  static isBrowser = new BehaviorSubject<boolean>(null!);

  constructor( @Inject(PLATFORM_ID) private platformId: any,
    private authService: AuthService, private loggingService: LoggingService,
    private router: Router, private urlService: UrlService
  ) {
    AppComponent.isBrowser.next(isPlatformBrowser(platformId));
  }

  ngOnInit() {
    this.authService.autoLogin();
    // this.loggingService.printLog('Hello from App Component ngOnInit');
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.previousUrl = this.currentUrl;
      this.currentUrl = event.url;
      this.urlService.setPreviousUrl(this.previousUrl);
    });
  }
}
