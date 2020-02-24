import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {MdDialog, MD_DIALOG_DATA} from '@angular/material';
import {} from '@types/googlemaps';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';


@Component({
  selector: 'app-mobile-brand-registration',
  templateUrl: './mobile-brand-registration.component.html',
  styleUrls: ['./mobile-brand-registration.component.css']
})
export class MobileBrandRegistrationComponent implements OnInit {

  regForm: FormGroup;
  mobPattern = new RegExp(/^[1-9][0-9]{4,12}$/);

  google_map_address:string;
  address_lat:any;
  address_lng:any;
  isReadonly: boolean = false;
  otpStatus:boolean = false;
  showOtpError:boolean = false;
  showVerificationError:boolean = false;
  sendOtpBtn:any = 'Send OTP';
  verifyBtn:any = 'Verify';
  verifyBtnStatus:boolean = false;
  city: any = [];

  constructor(
    private route:ActivatedRoute,
    public api:ApiService,
    private form:FormBuilder,
    private _router:Router,
    public dialog:MdDialog,
    public _commonService:CommonService
  
  ) {
    this.address_lat = "";
    this.address_lng = "";
    this.getCity();
  }

  ngOnInit() {
    if(this.api.loggedIn()){
      this._router.navigate(['/brand-dashboard']);
    }
    else{
      window.scrollTo(0,0);

      this.regForm = this.form.group({
        'firstname' : [null, Validators.required],
        'lastname' : [null, Validators.required],
        'email': [null, [Validators.required, Validators.email], this.emailExist.bind(this)],
        'country_code' : ['91', Validators.required],
        'phone': [null, [Validators.required, Validators.pattern(this.mobPattern)], this.phoneExist.bind(this)],
        'otp': [null],
        'business_name': [null, Validators.required],
        'business_desc': [null, Validators.required],
        'address': [null, Validators.required],
        'city': [null, Validators.required],
        'website': [null, Validators.required],
        'industry_type': ["", Validators.required],
        'other_industry_type': [null],
        'password': ['', Validators.required],
        'confirm_password' : ['', [Validators.required], this.passwordmisMatch.bind(this)]
      });
    }
  }

  /* Compare Passwords*/
  passwordmisMatch(control: FormControl) {
    const q = new Promise((resolve, reject) => {
      if (control.value != this.regForm.get('password').value) {
        resolve ({passwordmisMatch: true});
      } else {
        resolve(null);
      }
    });
    return q;
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

  /* Send OTP */
  sendOTP(){
    this.sendOtpBtn = 'Sending ...';
    let data = {
      email : this.regForm.get('email').value,
      phone : this.regForm.get('phone').value,
      code  : this.regForm.get('country_code').value,
    };

    if(data.email != '' && data.phone != '' && this.regForm.controls.email.valid && this.regForm.controls.phone.valid) {
      this.api.sendRegistrationOTP(data.email, (data.code + data.phone), 'KSPSMS').subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.sendOtpBtn = 'Resend OTP';
          this.otpStatus = true;
          // let dialogRef = this.dialog.open(MobileBrandRegistrationDialog,{data:'An OTP has been sent to your email address and mobile number'});
        }else{
          this.sendOtpBtn = 'Send OTP';
          let dialogRef = this.dialog.open(MobileBrandRegistrationDialog,{data: 'There is some network error, Please try after sometime.'});
        }
      },err=>{
      });
    } else {
      this.sendOtpBtn = 'Send OTP';
      let dialogRef = this.dialog.open(MobileBrandRegistrationDialog,{data:'Please enter valid email and phone number.'});
    }
  }

  /* Verify OTP */
  verifyOTP() {
    let phone = this.regForm.get('country_code').value + this.regForm.get('phone').value;
    let otp   = this.regForm.get('otp').value
    this.verifyBtn = 'Verify...';
    this.verifyBtnStatus = true;

    this.api.verifyRegistrationOTP(phone, otp).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code != 1){
        this.verifyBtn = 'Verify';
        this.verifyBtnStatus = false;
        this.showOtpError = true;
      } else{
        this.isReadonly = true;
        this.verifyBtnStatus = true;
      }
    },
    err => {
      this.verifyBtn = 'Verify';
      this.verifyBtnStatus = false;
      this.showOtpError = true;
    });
  }

  /* Save Brand Details */
  registerBrand(regData) {
    if(this.isReadonly) {
      this.showVerificationError = false;
      let industry_type_value = regData.industry_type;
      if(industry_type_value == 'Others' && regData.other_industry_type.trim()!=""){
        industry_type_value = regData.other_industry_type;
      }
      this.google_map_address = regData.address;
      this.getLatitudeLongitude();
      setTimeout(()=>{
        let brandInfo = {
          'firstname' : regData.firstname,
          'lastname' : regData.lastname,
          'email' : regData.email,
          'country_code' : regData.country_code,
          'phone' : regData.country_code + regData.phone,
          'business_name': regData.business_name,
          'business_desc': regData.business_desc,
          'address': regData.address,
          'city': regData.city,
          'website': regData.website,
          'industry_type': industry_type_value,
          'google_map_address': (document.getElementById('address_latlng') as HTMLInputElement).value,
          'password': regData.password
        }
        // console.log(brandInfo);
        this.api.registerBrand(brandInfo).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.api.storeUserData($ret.data.api_token, $ret.data);
            let dialogRef = this.dialog.open(MobileBrandRegistrationDialog,{data:'Thank you for registering with us.'});
            dialogRef.afterClosed().subscribe(result => {
              if(this._commonService.navUrl == '/event-submit') {
                this._router.navigate([this._commonService.navUrl]);
              } else {
                this._router.navigate(['/brand-dashboard']);
              }
            });
          }
          else{
            let dialogRef = this.dialog.open(MobileBrandRegistrationDialog,{data:'We are facing some problem.<br/>Please try again.'});
          }
        },
        err => {
        });
      },2000);
    } else {
      this.showVerificationError = true;
    }
  }

  getLatitudeLongitude() {
    if(!this.google_map_address){
      let dialogRef = this.dialog.open(MobileBrandRegistrationDialog,{data:'Please provide a valid address'});
    }
    else if(this.google_map_address.toString().trim()==""){
      let dialogRef = this.dialog.open(MobileBrandRegistrationDialog,{data:'Please provide a valid address'});
    }
    else{
      var geocoder = new google.maps.Geocoder();
      if(geocoder) {
        geocoder.geocode({
            'address': this.google_map_address,
          }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  this.address_lat = results[0].geometry.location.lat();
                  this.address_lng = results[0].geometry.location.lng();
                  (document.getElementById('address_latlng') as HTMLInputElement).value = this.address_lat + ',' + this.address_lng;
                }
                else{
                }
          });
      }
    }
  }
  getCity() {
    this.api.getCities().subscribe(ret => {
      if (ret['ret'].code === 1) {
        this.city = ret['ret'].data;
        console.log(this.city);
      }
    }, err => {
    });
  }
}

@Component({
 selector: 'dialog-messages',
 templateUrl: './dialog-messages.html',
})
export class MobileBrandRegistrationDialog {
 constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}
