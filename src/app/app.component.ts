import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiService } from './services/api.service';
import {GoogleAnalyticsEventsService} from "./services/google-analytics-events.service";

declare var addThisObj: any;
declare var ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  headless:boolean = false;
  data:any;

  public constructor(
  public titleService: Title,
  public _route: ActivatedRoute,
  public _router:Router,
  public _api:ApiService,
  ) {
    _router.events.subscribe(event => {
      this.data = this.getData(_router.routerState, _router.routerState.root);
      if(this.data.length > 0){
        titleService.setTitle(this.data[0].title);
        this.headless = this.data[0].headless;
      }
      addThisObj.refresh();
    });

    if (window.location.host==="kidsstoppress.com" || window.location.host==="www.kidsstoppress.com") {
      this._router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          ga('set', 'page', event.urlAfterRedirects);
          ga('send', 'pageview');
        }
      });
    }

    /* Set logged in user data from the database for first time.*/
    if(this._api.loggedIn()) {
      if(localStorage.getItem('guest_token')) {
        localStorage.removeItem('guest_token');
      }
      this._api.getUserProfileDetails().subscribe(response=>{
        let $ret = response.ret;
        if($ret.code == 1) {
          this._api.storeUserData($ret.data.user.api_token, $ret.data.user);
        }
      },err=>{

      });
    } else {
      console.log(window.location.pathname);
      if (window.location.pathname == '/') {
        this._router.navigate(['/grow-right']);
      }
      /* Create the guest user token if not exist. */
      let guest_token:any = localStorage.getItem('guest_token') ? localStorage.getItem('guest_token') : 0;
      if(!guest_token) {
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let text = '';
        for (var i = 0; i < 30; i++){
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        localStorage.setItem('guest_token', text);
      } 
    }
  }

  getData(state, parent) {
    let data:any = [];
    if(parent && parent.snapshot.data && parent.snapshot.data.title) {
       data.push(parent.snapshot.data);
    }

    if(state && parent) {
       data.push(... this.getData(state, state.firstChild(parent)));
    }
   return data;
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
}
