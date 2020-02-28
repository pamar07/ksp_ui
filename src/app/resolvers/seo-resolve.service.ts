import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, NavigationEnd } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable()
export class SeoResolve implements Resolve<any> {

  constructor(private service: ApiService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) {
    var slug = route.params.id ? route.params.id : route.params.slug;
    var pathname = route.routeConfig.path;
    var str = [];
    var path = '';
    if (pathname.indexOf(':') > -1) {
      str = /(.+):(.+)/.exec(pathname);
      path = str[1] + route.params[str[2]]
    } else {
      str = /(.+)/.exec(pathname);
      path = str[1];
    }
    //console.log("URL",path);
    return this.service.getSeoMeta(path);
  }
}
