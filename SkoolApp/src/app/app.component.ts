import { Component, OnInit } from '@angular/core';
import { TitleService } from '@services/title.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'angulartitle';

  constructor(
    private titleService: Title,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private activatedRoute : ActivatedRoute
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setDocTitle(title: string) {
     this.titleService.setTitle(title);
  }

  ngOnInit() {
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
      )
      .subscribe(() => {
        var rt = this.getChild(this.activatedRoute)
        rt.data.subscribe(data => {
          this.titleService.setTitle(data.title)})
      })
 
  }
 
  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
 
  }
}
