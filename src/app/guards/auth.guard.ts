import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../services/api.service';
import { environment } from '../../environments/environment';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: ApiService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot) {
    
    if(this.auth.loggedIn()) {
      let user = this.auth.getAuthUser();
      
      if(route.data.usertype == 'siteUser') {
        /* if user is logged in and route is accesible to site user only.*/ 
        if(user.usertype!=5) {
          return true;
        } else {
          this.router.navigate(['brand-dashboard']);  
        }
      
      } else if(route.data.usertype == 'business') {
        /* if user is logged in and route is accesible to Bussiness user only.*/ 
        if(user.usertype==5) {
          return true;
        } else {
          this.router.navigate(['dashboard']);  
        }
      
      } else if (route.data.usertype == 'all') {
        /* if route is accesible to all users.*/ 
        return true;
      }
      
      /*If user is not logged in just check if login is required for the route or not.*/ 
    } else {
      if(route.data.loginRequired) {
        this.router.navigate(['login']);
      } else {
        return true;
      }
    }
  }
}
