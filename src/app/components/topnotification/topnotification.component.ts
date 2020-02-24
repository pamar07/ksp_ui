import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-topnotification',
  templateUrl: './topnotification.component.html',
  styleUrls: ['./topnotification.component.css']
})
export class TopnotificationComponent implements OnInit {

  notificationList:any;
  notificationCount:number;

  constructor(
    public _apiService:ApiService,
    public _router:Router
  ) { }

  ngOnInit() {
    this.notificationCount = 0;
    this.notificationList = [];
    this.getNotifyCount();
  }

  updateNotification(){
    //console.log("updateNotification called");
    this._apiService.getNotificationList().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.notificationCount = 0;
        this.notificationList = $ret.data;
      }
    },err=>{
    });
  }

  getNotifyCount(){
    this._apiService.getNotificationCount().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.notificationCount = $ret.data.count;
      }
    },err=>{
    });
  }

}
