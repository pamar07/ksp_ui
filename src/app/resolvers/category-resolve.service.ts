import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable()
export class CategoryResolve implements Resolve<any> {

  constructor(private service: ApiService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getSurveyCategories();
  }
}