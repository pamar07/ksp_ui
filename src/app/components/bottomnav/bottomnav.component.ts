import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';
//import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';

import {MdDialog, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-bottomnav',
  templateUrl: './bottomnav.component.html',
  styleUrls: ['./bottomnav.component.css']
})
export class BottomnavComponent implements OnInit {

  subscribe_email:string;
  downloadBanner:boolean = true;
  applink:any = false;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _validateService:ValidateService,
    //public _flashMessagesService: FlashMessagesService,
    public dialog:MdDialog
  ) { }

  ngOnInit() {
      this.subscribe_email = '';
      this.downloadBanner = true;
      this.checkMobile();
  }

  subscribe(){
    let email;
    if(!this._apiService.loggedIn()){
      email = this.subscribe_email;
    }
    else{
      email = this._apiService.getAuthUser().email;
    }
    if(!this._validateService.validateEmail(email)){
      let dialogRef = this.dialog.open(SubscribeDialog,{data:'Sorry, you have entered an invalid email address!'});
      //this._flashMessagesService.show('Invalid Email!', { cssClass: 'error-message',timeout: 3000 });
      return false;
    }
    else{
      this._apiService.subscribeNewsletter(email,3).subscribe(ret=>{
        let $ret = ret.ret;
        console.log($ret);
        if(!this._apiService.loggedIn()){
          this.subscribe_email = '';
        }
        if($ret.code == 1){
          let dialogRef = this.dialog.open(SubscribeDialog,{data:'Thank you for subscribing...'});
          //this._flashMessagesService.show('Thank you for subscribing..', { cssClass: 'success-message',timeout: 3000 });
        }else{
          let dialogRef = this.dialog.open(SubscribeDialog,{data:$ret.data});
          //this._flashMessagesService.show($ret.data, { cssClass: 'error-message',timeout: 3000 });
        }
      },err=>{
      });
    }
  }

  hideBanner(){
    this.downloadBanner = false;
  }

  checkMobile(){
    if( /Android/i.test(navigator.userAgent) ) {
      this.applink = 'https://play.google.com/store/apps/details?id=ksp.xelpmoc.project#utm_source=referral&utm_medium=ksp_mobile_site&utm_campaign=ksp_android_banner&utm_content=bottom_banner';
    } else if(/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      this.applink = 'https://tinyurl.com/yaeuuqjq';
    }
  }
}

@Component({
 selector: 'dialog-messages',
 templateUrl: './dialog-messages.html',
})
export class SubscribeDialog {
 constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}
