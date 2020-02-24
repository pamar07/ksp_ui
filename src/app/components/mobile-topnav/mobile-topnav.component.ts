import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-mobile-topnav',
  templateUrl: './mobile-topnav.component.html',
  styleUrls: ['./mobile-topnav.component.css']
})
export class MobileTopnavComponent implements OnInit {
  awardMenu: any;
  constructor(
    public _apiService: ApiService
  ) { }

  ngOnInit() {
    this.getAwardsMenu();
  }
  getAwardsMenu() {
    this._apiService.getAwardMenu().subscribe(ret => {
      const $ret = ret.ret;
      console.log($ret);
      this.awardMenu = $ret.data;
    },
      err => {
      });
  }
}
