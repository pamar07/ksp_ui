import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MdDialog, MD_DIALOG_DATA} from '@angular/material';

import { ReCaptchaComponent } from 'angular2-recaptcha';

import { ApiService } from '../../../services/api.service';
import { ValidateService } from '../../../services/validate.service';
import { CommonService } from '../../../services/common.service';
//import { FlashMessagesService } from 'angular2-flash-messages';
import { Cookie } from 'ng2-cookies/ng2-cookies';

declare var encodeObj: any;
declare var decodeObj: any;

@Component({
  selector: 'app-web-login',
  templateUrl: './web-login.component.html',
  styleUrls: ['./web-login.component.css'],
  providers:[Cookie]
})
export class WebLoginComponent implements OnInit {

  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

  email:string;
  password:string;
  resetEmail:string;
  phone:number;
  otp:number;
  newPassword:string;
  newConfirmPassword:string;
  loginStatus:number;
  rememberMe:boolean;
  showotpinput: Boolean = false;
  showotp: Boolean = false;
  //message:string;
  //showMessage:boolean;
  //showSuccessMessage:boolean;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _validateService:ValidateService,
    public _router:Router,
    public dialog:MdDialog,
    //public _flashMessagesService: FlashMessagesService,
    public Cookie: Cookie
  ) { }

  ngOnInit() {
    window.scrollTo(0,0);
    if(this._apiService.loggedIn()){
      if(this._commonService.navUrl == ''){
        this._router.navigate(['/dashboard']);
      }
      else{
        this._router.navigate([this._commonService.navUrl]);
      }
    }
    if(Cookie.get('email')!=null && Cookie.get('password')!=null){
      this.email = Cookie.get('email');
      this.password = Cookie.get('password');
      // this.password = decodeObj.decode(Cookie.get('password'));
      this.rememberMe = true;
      $(document).ready(function(){
        $('#email').find('.form-control').addClass('bg-color-autofill');
        $('#password').find('.form-control').addClass('bg-color-autofill');
        $('#email').find('.form-control').keyup(function() {
          $('#email').find('.form-control').removeClass('bg-color-autofill');
        });
        $('#password').find('.form-control').keyup(function() {
          $('#password').find('.form-control').removeClass('bg-color-autofill');
        });
      });
    }
    else{
      this.email = '';
      this.password = '';
      this.rememberMe = false;
    }

    this.loginStatus = 0;
  }

  onLoginSubmit(){

    const user = {
      email:this.email,
      password:this.password
    };
    // let token = this.captcha.getResponse();
    // if(token.length == 0){
    //   let dialogRef = this.dialog.open(LoginDialog,{data:'reCAPTCHA verification failed...<br/>Please try again...'});
    //   return false;
    // }
    if(!this._validateService.validateLogin(user)){
      //this._flashMessagesService.show('All fields are required!', { cssClass: 'error-message',timeout: 3000 });
      let dialogRef = this.dialog.open(LoginDialog,{data:'All fields are required!'});
      return false;
    }
    if(!this._validateService.validateEmail(user.email)){
      //this._flashMessagesService.show('Invalid Email!', { cssClass: 'error-message',timeout: 3000 });
      let dialogRef = this.dialog.open(LoginDialog,{data:'Invalid Email!'});
      return false;
    }

    this._apiService.loginUser(user).subscribe(ret=>{
      let $ret = ret.ret;

      if($ret.code == 1){
        this._apiService.storeUserData($ret.data.api_token, $ret.data);
        if(this.rememberMe){
          Cookie.set('email', this.email, 30);
          Cookie.set('password', this.password, 30);
          // Cookie.set('password', encodeObj.encode(this.password), 30);
        }
        else{
          Cookie.deleteAll();
        }

        //window.location.reload();
        if($ret.data.usertype != 5){
          if(localStorage.getItem("selectedCities")!=null){
            localStorage.removeItem("selectedCities");
          }
          if(localStorage.getItem("selectedAges")!=null){
            localStorage.removeItem("selectedAges");
          }
          if(this._commonService.navUrl == ''){
            this._router.navigate(['/dashboard']);
          }
          else{
            this._router.navigate([this._commonService.navUrl]);
            console.log(this._commonService.navUrl);

            let navUrlType;
            let entityId;
            let entityType;
            let navUrlStrArr = this._commonService.navUrl.split('/');
            navUrlType = navUrlStrArr[1];
            entityId = navUrlStrArr[2];
            if(navUrlType == "article-individual"){
              entityType = "post";
            }
            else if(navUrlType == "tv-individual"){
              entityType = "videos";
            }
            else if(navUrlType == "radio-individual"){
              entityType = "ksp-radio";
            }
            else if(navUrlType == "post-individual"){
              entityType = "social-group";
            }
            else if(navUrlType == "event-individual"){
              entityType = "event";
            }

            this._apiService.intentCapture(entityId,entityType,this._commonService.navUrl).subscribe(ret=>{
              $ret = ret.ret;
              if($ret.code == 1){
                this._commonService.navUrl = '';
              }
            });
          }
        }
        else{
          if(this._commonService.navUrl == '/event-submit') {
            this._router.navigate([this._commonService.navUrl]);
          } else {
            this._router.navigate(['/brand-dashboard']);
          }
        }
      }else{
        let dialogRef = this.dialog.open(LoginDialog,{data:'You have entered an invalid username or password'});
        //this._flashMessagesService.show('You have entered an invalid username or password', { cssClass: 'error-message',timeout: 3000 });
      }
    },
    err => {
      let dialogRef = this.dialog.open(LoginDialog,{data:'You have entered an invalid username or password'});
      //this._flashMessagesService.show('You have entered an invalid username or password', { cssClass: 'error-message',timeout: 3000 });
    });
  }

  // sendOTP(){
  //   if(this.phone != undefined){
  //     if(Number(this.phone)){
  //       if(this.phone > 0){
  //         this._apiService.sendOTP(this.phone).subscribe(ret=>{
  //           let $ret = ret.ret;
  //           if($ret.code == 1){
  //             this.loginStatus = 2;
  //             let dialogRef = this.dialog.open(LoginDialog,{data:'An OTP has been sent to ' + this.phone});
  //           }
  //           else{
  //             let dialogRef = this.dialog.open(LoginDialog,{data:'You have entered an invalid phone no.'});
  //           }
  //         },
  //         err => {
  //           let dialogRef = this.dialog.open(LoginDialog,{data:'Some problem has occured.<br/>Please try after some time.'});
  //         });
  //       }
  //       else{
  //         let dialogRef = this.dialog.open(LoginDialog,{data:'Incorrect format of phone number.'});
  //       }
  //     }
  //     else{
  //       let dialogRef = this.dialog.open(LoginDialog,{data:'Phone number must be a number.'});
  //     }
  //   }
  //   else{
  //     let dialogRef = this.dialog.open(LoginDialog,{data:'Please enter the phone number.'});
  //   }
  // }
  //
  // verifyOTP(){
  //   if(this.otp != undefined){
  //     if(Number(this.otp)){
  //       if(this.otp > 0){
  //         this._apiService.verifyOTP(this.phone,this.otp).subscribe(ret=>{
  //           let $ret = ret.ret;
  //           if($ret.code == 1){
  //             this.loginStatus = 3;
  //           }
  //           else{
  //             let dialogRef = this.dialog.open(LoginDialog,{data:'OTP is incorrect.<br/>Please enter the correct OTP.'});
  //           }
  //         },
  //         err => {
  //           let dialogRef = this.dialog.open(LoginDialog,{data:'Some problem has occured.<br/>Please try after some time.'});
  //         });
  //       }
  //       else{
  //         let dialogRef = this.dialog.open(LoginDialog,{data:'Incorrect format of OTP.'});
  //       }
  //     }
  //     else{
  //       let dialogRef = this.dialog.open(LoginDialog,{data:'OTP must be a number.'});
  //     }
  //   }
  //   else{
  //     let dialogRef = this.dialog.open(LoginDialog,{data:'Please enter the OTP.'});
  //   }
  // }
  //
  // changePassword(){
  //   if(this.newPassword == this.newConfirmPassword){
  //       this._apiService.changePassword(this.phone,this.newPassword).subscribe(ret=>{
  //         let $ret = ret.ret;
  //         if($ret.code == 1){
  //           this.loginStatus = 0;
  //           let dialogRef = this.dialog.open(LoginDialog,{data:'Password changed successfully.<br/>Please login with new password.'});
  //         }
  //         else{
  //           let dialogRef = this.dialog.open(LoginDialog,{data:'Password cannot be changed.<br/>Some problem has occured.'});
  //         }
  //       },
  //       err => {
  //         let dialogRef = this.dialog.open(LoginDialog,{data:'Some problem has occured.<br/>Please try after some time.'});
  //       });
  //   }
  //   else{
  //     let dialogRef = this.dialog.open(LoginDialog,{data:'Password and confirm password is not same.<br/>Please check.'});
  //   }
  // }

  sendEmailOTP(){
    if(this.resetEmail != undefined){
      if(this._validateService.validateEmail(this.resetEmail)){
          this._apiService.sendEmailOTP(this.resetEmail).subscribe(ret=>{
            let $ret = ret.ret;
            if($ret.code == 1){
              this.loginStatus = 2;
              let dialogRef = this.dialog.open(LoginDialog,{data:'An OTP has been sent to your email id'});
            }
            else{
              let dialogRef = this.dialog.open(LoginDialog,{data:'Sorry, this email address is not registered in our platform'});
            }
          },
          err => {
            let dialogRef = this.dialog.open(LoginDialog,{data:'Some problem has occured.<br/>Please try after some time.'});
          });
      }
      else{
        let dialogRef = this.dialog.open(LoginDialog,{data:'Please enter a valid email address'});
      }
    }
    else{
      let dialogRef = this.dialog.open(LoginDialog,{data:'Please enter your registered email address.'});
    }
  }

  verifyEmailOTP(){
    if(this.otp != undefined){
      if(Number(this.otp)){
        if(this.otp > 0){
          this._apiService.verifyEmailOTP(this.resetEmail,this.otp).subscribe(ret=>{
            let $ret = ret.ret;
            if($ret.code == 1){
              this.loginStatus = 3;
            }
            else{
              let dialogRef = this.dialog.open(LoginDialog,{data:'OTP is incorrect.<br/>Please enter the correct OTP.'});
            }
          },
          err => {
            let dialogRef = this.dialog.open(LoginDialog,{data:'Some problem has occured.<br/>Please try after some time.'});
          });
        }
        else{
          let dialogRef = this.dialog.open(LoginDialog,{data:'Incorrect format of OTP.'});
        }
      }
      else{
        let dialogRef = this.dialog.open(LoginDialog,{data:'OTP must be a number.'});
      }
    }
    else{
      let dialogRef = this.dialog.open(LoginDialog,{data:'Please enter the OTP.'});
    }
  }

  changePasswordByEmail(){
    if(this.newPassword == this.newConfirmPassword){
        this._apiService.changePasswordByEmail(this.resetEmail,this.newPassword).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.loginStatus = 0;
            let dialogRef = this.dialog.open(LoginDialog,{data:'Password changed successfully.<br/>Please login with new password.'});
          }
          else{
            let dialogRef = this.dialog.open(LoginDialog,{data:'Password cannot be changed.<br/>Some problem has occured.'});
          }
        },
        err => {
          let dialogRef = this.dialog.open(LoginDialog,{data:'Some problem has occured.<br/>Please try after some time.'});
        });
    }
    else{
      let dialogRef = this.dialog.open(LoginDialog,{data:'Password and confirm password is not same.<br/>Please check.'});
    }
  }

  goToEditPhone(){
    this.loginStatus = 1;
  }

  resetCaptcha(){
    this.captcha.reset();
  }
  loginwithOtp() {
    this.loginStatus = 4;
  }
  sendOTP() {
    console.log(this.email);
    if (this.email != undefined) {
      if(this._validateService.validateEmail(this.email)) {
          this._apiService.sendEmailOTP(this.email).subscribe(ret => {
            let $ret = ret.ret;
            if($ret.code == 1){
              let dialogRef = this.dialog.open(LoginDialog,{data:'An OTP has been sent to your email ID and registered phone number'});
              this.showotp = true;
            }
            else{
              let dialogRef = this.dialog.open(LoginDialog,{data:'Sorry, this email address is not registered in our platform'});
            }
          },
          err => {
            let dialogRef = this.dialog.open(LoginDialog,{data:'Some problem has occured.<br/>Please try after some time.'});
          });
      }
      else{
        let dialogRef = this.dialog.open(LoginDialog,{data:'Please enter a valid email address'});
      }
    }
    else{
      let dialogRef = this.dialog.open(LoginDialog,{data:'Please enter your registered email address.'});
    }
  }
  verifyOTPforlogin(){
    if(this.otp != undefined){
      if(Number(this.otp)){
        if(this.otp > 0){
          this._apiService.loginWithOTP(this.email, this.otp).subscribe(ret=>{
            let $ret = ret.ret;
      
            if($ret.code == 1){
              this._apiService.storeUserData($ret.data[0].api_token, $ret.data[0]);
              if(this.rememberMe){
                Cookie.set('email', this.email, 30);
                Cookie.set('password', this.password, 30);
                // Cookie.set('password', encodeObj.encode(this.password), 30);
              }
              else{
                Cookie.deleteAll();
              }
      
              //window.location.reload();
              if($ret.data[0].usertype != 5){
                if(localStorage.getItem("selectedCities")!=null){
                  localStorage.removeItem("selectedCities");
                }
                if(localStorage.getItem("selectedAges")!=null){
                  localStorage.removeItem("selectedAges");
                }
                if(this._commonService.navUrl == ''){
                  this._router.navigate(['/dashboard']);
                }
                else{
                  this._router.navigate([this._commonService.navUrl]);
                  console.log(this._commonService.navUrl);
      
                  let navUrlType;
                  let entityId;
                  let entityType;
                  let navUrlStrArr = this._commonService.navUrl.split('/');
                  navUrlType = navUrlStrArr[1];
                  entityId = navUrlStrArr[2];
                  if(navUrlType == "article-individual"){
                    entityType = "post";
                  }
                  else if(navUrlType == "tv-individual"){
                    entityType = "videos";
                  }
                  else if(navUrlType == "radio-individual"){
                    entityType = "ksp-radio";
                  }
                  else if(navUrlType == "post-individual"){
                    entityType = "social-group";
                  }
                  else if(navUrlType == "event-individual"){
                    entityType = "event";
                  }
      
                  this._apiService.intentCapture(entityId,entityType,this._commonService.navUrl).subscribe(ret=>{
                    $ret = ret.ret;
                    if($ret.code == 1){
                      this._commonService.navUrl = '';
                    }
                  });
                }
              }
              else {
                if(this._commonService.navUrl == '/event-submit') {
                  this._router.navigate([this._commonService.navUrl]);
                } else {
                  this._router.navigate(['/brand-dashboard']);
                }
              }
            }else{
              let dialogRef = this.dialog.open(LoginDialog,{data:'You have entered an invalid username or password'});
              //this._flashMessagesService.show('You have entered an invalid username or password', { cssClass: 'error-message',timeout: 3000 });
            }
          },
          err => {
            let dialogRef = this.dialog.open(LoginDialog,{data:'You have entered an invalid username or password'});
            //this._flashMessagesService.show('You have entered an invalid username or password', { cssClass: 'error-message',timeout: 3000 });
          });
        }
        else{
          let dialogRef = this.dialog.open(LoginDialog,{data:'Incorrect format of OTP.'});
        }
      }
      else{
        let dialogRef = this.dialog.open(LoginDialog,{data:'OTP must be a number.'});
      }
    }
    else{
      let dialogRef = this.dialog.open(LoginDialog,{data:'Please enter the OTP.'});
    }
  }

}

@Component({
 selector: 'dialog-messages',
 templateUrl: './dialog-messages.html',
})
export class LoginDialog {
 constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}
