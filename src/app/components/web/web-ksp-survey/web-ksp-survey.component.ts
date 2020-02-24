import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {MdDialog, MD_DIALOG_DATA} from '@angular/material';
import { NgxCarousel } from 'ngx-carousel';

import { ApiService } from '../../../services/api.service';

declare var addThisObj: any;

@Component({
  selector: 'app-web-ksp-survey',
  templateUrl: './web-ksp-survey.component.html',
  styleUrls: ['./web-ksp-survey.component.css']
})
export class WebKspSurveyComponent implements OnInit {
  categories:any[] = [];
  userVoteCategory:any[] = [];
  userVoteOption:any[] = [];
  currentPage:any;
  currentCategory:any;
  selectedOption:any = '';
  selectedOptionText:any;
  showOptionError:any;
  authTab:any;
  showOtp:any = 0;
  loginError:any = 0;
  cityList:any;
  lastVoteId = 0;
  regData:any;
  userOtp:any;
  showOtpError = 0;
  loginForm: FormGroup;
  regForm: FormGroup;
  forgotPassForm: FormGroup;
  resetPassForm: FormGroup;
  //mobPattern = new RegExp(/^([7-9]){1}(\d)(?!\1+$)\d{8}?$/);
  mobPattern = new RegExp(/^[1-9][0-9]{4,12}$/);
  shareCount:any;
  mainPageShareCount:any;
  forgotOtp:any;
  public carouselTile: NgxCarousel;

  constructor(
    private route:ActivatedRoute,
    public api:ApiService,
    private form:FormBuilder,
    private _route:Router,
    public dialog:MdDialog,) {

    // let response = this.route.snapshot.data['categories'].ret;
    // if(response.code == 1) {
    //   this.categories = response.data.categories;
    //   this.userVoteCategory = response.data.userCategory ? response.data.userCategory : [];
    //   this.userVoteOption   = response.data.userOptions ? response.data.userOptions : [];
    // }
    this.currentPage = 'categories';
    this.shareCount = 0;
    this.mainPageShareCount = 0;
  }

  ngOnInit() {
    window.scrollTo(0,0);
    this.selectedOption = 0;
    addThisObj.refresh();

    this.carouselTile = {
      grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      easing: 'ease'
    }

    this.api.getSurveyCategories().subscribe(ret=>{
      let response = ret.ret;
      if(response.code == 1) {
        this.categories = response.data.categories;
        this.userVoteCategory = response.data.userCategory ? response.data.userCategory : [];
        this.userVoteOption   = response.data.userOptions ? response.data.userOptions : [];
        this.loadDetailCategory();
      }
    });

    this.loginForm = this.form.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password' : [null, Validators.required],
    });

    this.regForm = this.form.group({
      'name' : [null, Validators.required],
      'email': [null, [Validators.required, Validators.email], this.emailExist.bind(this)],
      'sender_id' : ['KSPSMS', Validators.required],
      'country_code' : ['91', Validators.required],
      'phone': [null, [Validators.required, Validators.pattern(this.mobPattern)], this.phoneExist.bind(this)],
      'gender': ['Female', Validators.required],
      'city': ["", Validators.required],
      'family_status': ["", Validators.required],
    });

    this.forgotPassForm = this.form.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
    });

    this.resetPassForm = this.form.group({
      'password' : [null, Validators.required],
      'confirm_password' : [null, Validators.required],
    });

    this.api.getCities().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.cityList = $ret.data;
      }else{
        this.cityList = [];
      }
    },err=>{

    });

    /*Calculate main page share count*/
    this.api.getShareCount(this.api.share_url + 'Awards2017').subscribe(ret_share=>{
      this.mainPageShareCount = ret_share.shares;
    });

    /* Get category id from the url.*/
    // this.route.params.subscribe(params => {
    //   if(params['id']) {
    //     let obj = this.categories.find( function(item) { return item.id == params['id']} );
    //     if(obj){
    //       this.currentCategory = obj;
    //       this.currentPage = 'categoryOptions';
    //     } else {
    //       this._route.navigateByUrl('/Awards2017');
    //     }
    //   }
    // });
  }

  ngAfterViewInit() {

  }

  getFirstName(name){
    let firstName = name.split(' ');
    return firstName[0];
  }

  loadDetailCategory(){
    /* Get category id from the url.*/
    this.route.params.subscribe(params => {
      if(params['id']) {
        let obj = this.categories.find( function(item) { return item.id == params['id']} );
        if(obj){
          addThisObj.refresh();
          this.currentCategory = obj;
          this.currentPage = 'categoryOptions';
          $(document).ready(function() {
            //document.getElementById('categoryDetail').scrollIntoView();
            $('html, body').animate({scrollTop: $('#categoryDetail').offset().top - 100}, 300);
          });
          /*Calculate share count*/
          this.api.getShareCount(this.api.share_url + 'Awards2017/' + params['id']).subscribe(ret_share=>{
            this.shareCount = ret_share.shares;
          });
        } else {
          this._route.navigateByUrl('/Awards2017');
        }
      }
    });
  }

  /* Select option */
  selectOption(option) {
    if(this.userVoteCategory.indexOf(this.currentCategory.id)== -1){
      this.selectedOption = option.id;
      this.selectedOptionText = option.opt;
    }
  }


  /*Check for Email in the server.*/
  emailExist(control: FormControl) {
    if(!control.hasError('email')) {
      const data = {field: 'email', val: control.value};
      const q = new Promise((resolve, reject) => {
        setTimeout(() => {
          this.api.checkUserData(data).subscribe(ret=>{
            let $ret = ret.ret;
            if($ret.code == 1){
              resolve({'emailExist': true});
            } else {
              resolve(null);
            }
          },err => {
            resolve(null);
          });

        }, 100);
      });
      return q;
    } else {
      return null;
    }
  }

  /*Check for Phone in the server.*/
  phoneExist(control: FormControl) {
    if(!control.hasError('phone')) {
      const data = {field: 'phone', val: (this.regForm.controls.country_code.value + control.value)};
      const q = new Promise((resolve, reject) => {
        setTimeout(() => {
          this.api.checkUserData(data).subscribe(ret=>{
            let $ret = ret.ret;
            if($ret.code == 1){
              resolve({'phoneExist': true});
            } else {
              resolve(null);
            }
          },err => {
            resolve(null);
          });

        }, 100);
      });
      return q;
    } else {
      return null;
    }
  }

  /* Show category options */
  showCategory(index) {
    this.currentCategory     = this.categories[index];
    this.currentPage         = 'categoryOptions';
    this.selectedOption      = 0;
    this.selectedOptionText  = '';
    this.showOptionError     = 0;
    this.lastVoteId          = 0
  }

  /* save user vote. */
  saveUserVote() {
    if(!this.selectedOption)  {
      this.showOptionError = 1;

    } else {
      /*save user vote*/
      let data = {
        survey_id : this.currentCategory.survey_id,
        category_id : this.currentCategory.id,
        opt_id : this.selectedOption,
        opt_text: this.selectedOptionText
      };

      this.api.saveUserVote(data).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.lastVoteId = $ret.data.id;
        }
      });

      /* check if user is loggedin then saves vote else show authentication div. */
      this.showOptionError = 0;
      if(!this.api.loggedIn()) {
        this.currentPage = 'authenticate';
        this.authTab     = 'login';
      } else {
        this.currentPage = 'thankyou';
        this.saveFrontVote();
      }
    }
  }

  sendForgotOtp(data){
    this.api.sendEmailOTP(data.email).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        let dialogRef = this.dialog.open(WebDialog,{data:'An OTP has been sent to your email id'});
        this.authTab = 'forgot-password-otp';
      }
      else{
        let dialogRef = this.dialog.open(WebDialog,{data:'Sorry, this email address is not registered in our platform'});
      }
    },
    err => {
      let dialogRef = this.dialog.open(WebDialog,{data:'Some problem has occured.<br/>Please try after some time.'});
    });
  }

  verifyEmailOTP(){
    if(this.forgotOtp != undefined){
      if(Number(this.forgotOtp)){
        if(this.forgotOtp > 0){
          this.api.verifyEmailOTP(this.forgotPassForm.controls['email'].value,this.forgotOtp).subscribe(ret=>{
            let $ret = ret.ret;
            if($ret.code == 1){
              this.authTab = 'forgot-password-newpass';
            }
            else{
              let dialogRef = this.dialog.open(WebDialog,{data:'OTP is incorrect.<br/>Please enter the correct OTP.'});
            }
          },
          err => {
            let dialogRef = this.dialog.open(WebDialog,{data:'Some problem has occured.<br/>Please try after some time.'});
          });
        }
        else{
          let dialogRef = this.dialog.open(WebDialog,{data:'Incorrect format of OTP.'});
        }
      }
      else{
        let dialogRef = this.dialog.open(WebDialog,{data:'OTP must be a number.'});
      }
    }
    else{
      let dialogRef = this.dialog.open(WebDialog,{data:'Please enter the OTP.'});
    }
  }

  changePasswordByEmail(data){
    if(data.password == data.confirm_password){
        this.api.changePasswordByEmail(this.forgotPassForm.controls['email'].value,data.password).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            let dialogRef = this.dialog.open(WebDialog,{data:'Password changed successfully.<br/>Please login with new password.'});
            this.authTab = 'login';
          }
          else{
            let dialogRef = this.dialog.open(WebDialog,{data:'Password cannot be changed.<br/>Some problem has occured.'});
          }
        },
        err => {
          let dialogRef = this.dialog.open(WebDialog,{data:'Some problem has occured.<br/>Please try after some time.'});
        });
    }
    else{
      let dialogRef = this.dialog.open(WebDialog,{data:'Password and confirm password is not same.<br/>Please check.'});
    }
  }

  /* Submit login form */
  submitLoginForm(data) {
    const user = {
      email:data.email,
      password:data.password
    };

    this.api.loginUser(user).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.api.storeUserData($ret.data.api_token, $ret.data);
        Cookie.deleteAll();

        if($ret.data.usertype != 1) {
          /* Fetch user previuos details */
          this.api.getSurveyCategories().subscribe(ret=>{
            let $ret = ret.ret;
            if($ret.code == 1) {
              this.userVoteCategory = $ret.data.userCategory ? $ret.data.userCategory : [];
              this.userVoteOption   = $ret.data.userOptions ? $ret.data.userOptions : [];
            }
          });

          /*Update user last vote.*/
          if(this.lastVoteId) {
            this.updateUserVote();
          } else {
            this.currentPage = 'thankyou';
          }
        } else {
          window.location.href = this.api.admin_url+ 'admin_login?token=' + $ret.data.api_token;
        }
      } else{
        this.loginError = 1;
      }
    },
    err => {
      this.loginError = 1;
    });
  }

  /* submit Reg form */
  submitRegForm(data) {
    this.regData = data;
    this.regData.phone = this.regData.country_code + this.regData.phone;
    this.regData.sender_id = $('#countryCodeDD').find('option:selected').attr('data-senderID');
    this.sendOtp();
    this.saveVoterInfo();
    let dialogRef = this.dialog.open(WebDialog,{data:'An OTP has been sent to your email address and mobile number'});
    this.showOtp = 1;
  }

  /* Save Voter Deatils in ksp_survey_tmp_users */
  saveVoterInfo() {
    let voterInfo = {
      'name' : this.regData.name,
      'city' : this.regData.city,
      'gender' : this.regData.gender,
      'family_status' : this.regData.family_status,
      'email' : this.regData.email,
      'country_code' : this.regData.country_code,
      'phone' : this.regData.phone,
      'sender_id' : this.regData.sender_id,
      'vote_id' : this.lastVoteId
    }
    this.api.saveVoterInfo(voterInfo).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
      }
    },
    err => {
    });
  }

  /* Send OTP */
  sendOtp() {
    this.api.sendRegistrationOTP(this.regData.email,this.regData.phone, this.regData.sender_id).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
      }
    },
    err => {

    });
  }

  /* Verify OTP */
  verifyOTP() {
    this.api.verifyRegistrationOTP(this.regData.phone, this.userOtp).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code != 1){
        this.showOtpError = 1;
      } else{
        this.signUpUser();
      }
    },
    err => {
      this.showOtpError = 1;
    });
  }

  /* signup User*/
  signUpUser() {
    this.api.registerSurveyUser(this.regData).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.api.storeUserData($ret.data.api_token, $ret.data);
        Cookie.deleteAll();

        /*Update user last vote.*/
        if(this.lastVoteId) {
          this.updateUserVote();
        } else {
          this.currentPage = 'thankyou';
        }
      } else{

      }
    },
    err => {
      this.showOtpError = 1;
    });
  }

  /*Update user vote.*/
  updateUserVote() {
    let data = {
      vote_id: this.lastVoteId,
      survey_id : this.currentCategory.survey_id,
      category_id : this.currentCategory.id
    };

    this.api.updateUserVote(data).subscribe(ret=>{
      let $error = ret.err;
      if($error.code == 1) {
        this._route.navigateByUrl('/Awards2017');
        let dialogRef = this.dialog.open(WebDialog,{data:$error.msg});
      } else {
        this.currentPage = 'thankyou';
        this.saveFrontVote();
      }
    });
  }

  /* Save vote in front end*/
  saveFrontVote(){
    this.userVoteCategory.push(this.currentCategory.id);
    this.userVoteOption.push(this.selectedOption);
  }

  /* redirect to category*/
  directToCategory(id) {
    window.scrollTo(0,0);
    this._route.navigateByUrl('/Awards2017/'+id);

  }
}

@Component({
 selector: 'dialog-messages',
 templateUrl: './dialog-messages.html',
})
export class WebDialog {
 constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}
