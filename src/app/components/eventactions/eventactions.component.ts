import {Component, Input, OnInit} from '@angular/core';

import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-eventactions',
  templateUrl: './eventactions.component.html',
  styleUrls: ['./eventactions.component.css']
})

export class EventactionsComponent implements OnInit {

  @Input() eventId: any;
  @Input() eventPermalink: any;
  status: any = '0';
  over: any = '0';

  constructor(
      public _apiService: ApiService,
      public _router: Router,
      public _commonService: CommonService
  ) { }

  ngOnInit() {
    this._apiService.checkEventStatus(this.eventId).subscribe(
      ret => {
        const res = ret.ret;
        if (res.status != null) {
          this.status = res.status;
          if (res.over) {
            this.over = '1';
          }
        }else {
          this.status = '0';
        }
      }, err => {
      });
  }

  going() {
    if (this._apiService.loggedIn()) {
      if (this.status !== '3') {
        this._apiService.eventStatusChange(this.eventId, '3').subscribe(
          ret => {
            const res = ret.ret;
            this.status = res.status;
          }, err => {
          });
      } else {
        this._apiService.eventStatusChange(this.eventId, '0').subscribe(
          ret => {
            const res = ret.ret;
            this.status = res.status;
          }, err => {
          });
      }
    } else {
      this._commonService.setNavigationUrl('event', this.eventId, this.eventPermalink);
    }

  }

  insterested() {
    if (this._apiService.loggedIn()) {
      if (this.status !== '2') {
        this._apiService.eventStatusChange(this.eventId, '2').subscribe(
          ret => {
            const res = ret.ret;
            this.status = res.status;
          }, err => {
          });
      }else {
        this._apiService.eventStatusChange(this.eventId, '0').subscribe(
          ret => {
            const res = ret.ret;
            this.status = res.status;
          }, err => {
          });
      }
    } else {
      this._commonService.setNavigationUrl('event', this.eventId, this.eventPermalink);
    }
  }

}
