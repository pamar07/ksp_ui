import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../services/api.service';
import { environment } from '../../environments/environment';

@Injectable()
export class BrandAuthGuard implements CanActivate {

  constructor(private auth: ApiService, private router: Router) {}

  canActivate() {
    if(this.auth.loggedIn() ) {
      let user = this.auth.getAuthUser();
      if(user.usertype==5){
        return true;
      }
      else{
        this.router.navigate(['dashboard']);
      }
    } else {
      this.router.navigate(['login']);
    }
  }
}
