import { Component, OnInit } from '@angular/core';
// import { DeviceDetectorService } from 'ngx-device-detector';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../services/common.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistrationDialog} from '../web/web-registration/web-registration.component';
import {Title} from '@angular/platform-browser';
import { resolve } from 'url';
// import {local} from 'angular-io-datepicker';

@Component({
  selector: 'app-ksp-voting-2019-content',
  templateUrl: './ksp-voting-2019-content.component.html',
  styleUrls: ['./ksp-voting-2019-content.component.css']
})
export class KspVoting2019ContentComponent implements OnInit {
  regForm: FormGroup;
  otpVerifyForm: FormGroup;
  logForm: FormGroup;
  mobPattern = new RegExp(/^[1-9][0-9]{4,12}$/);
  brands: any = [];
  userData: any;
  category_id: any;
  selectedItem: any;
  categoryData: any = [];
  user_id: any;
  guest_id: any;
  voteData: any;
  userEmail: any;
  userPhone: any;
  cityList: any = [];
  warning_submit: Boolean = false;
  login_warning: Boolean = false;
  login_form_show: Boolean = false;
  otp_form_show: Boolean = false;
  vote_submit: Boolean = false;
  otp_verification_show: Boolean = false;
  isFormSubmitted: Boolean = false;
  isOtpFormSubmitted: Boolean = false;
  isLogFormSubmitted: Boolean = false;
  otpVerifiedText: any = 'Otp has been sent.';
  loginText: any = '';
  alreadyVoted: boolean = false;
  categories: any = [];
  categoryTitle: any;
  otpemail: any;
  showOTPNEW: any = false;
  otp: any;
  showerr: any = 0;
  otperr: any = 0;
  recheckLogin: Boolean = false;
  showResendOTPText: any = true;
  showRegButton: Boolean = true;
  showResendOTPText1: Boolean = true;
  submitvotetext: Boolean = true;
  constructor(public _apiService: ApiService, private router: Router, private titleService: Title,
    public _commonService: CommonService, private activatedRoute: ActivatedRoute, private form: FormBuilder) { }

  ngOnInit() {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 16);
    localStorage.removeItem('selected_brand');
    this.activatedRoute.params.subscribe(params => {
      this.category_id = params['id'] || 0;
      this._apiService.getCategoryDetails({'id': this.category_id}).subscribe( ret => {
        if (ret.ret.code === 1) {
          this.categoryData = ret.ret.category_details[0];
        }
      });
      this._apiService.getCities().subscribe( ret => {
        if (ret.ret.code === 1) {
          this.cityList = ret.ret.data;
        }
      });
      this._apiService.listAllBrandPerCategory({category: this.category_id}).subscribe(ret => {
        if ( ret.ret.code === 1 ) {
          this.brands = ret.ret.data;
          this.brands.sort(function(a, b){
            return a.companyName === b.companyName ? 0 : a.companyName < b.companyName ? -1 : 1;
        });
        }
      });
      this._apiService.getAwardCategory('2019').subscribe( ret => {
        this.categories = ret['ret'].data;
        const index = this.categories.findIndex(x => x.id ==  this.category_id);
        if (index != -1) {
          console.log(this.categories[index].category);
          this.categoryTitle = this.categories[index].category;
          this.titleService.setTitle(this.categoryTitle);
        }
      });
      if (this._apiService.loggedIn()) {
        this.user_id = localStorage.getItem('token');
      }
      if (localStorage.getItem('guest_id')) {
        this.guest_id = localStorage.getItem('guest_id');
      } else {
        this.guest_id = this.makeId();
        localStorage.setItem('guest_id', this.guest_id);
      }
      if (localStorage.getItem('selected_brand')) {
        this.selectedItem = localStorage.getItem('selected_brand');
      }
      this.regForm = this.form.group({
        'name' : [null, Validators.required],
        'email': [null, [Validators.required, Validators.email], this.emailExist.bind(this)],
        'phone': [null, [Validators.required, Validators.pattern(this.mobPattern)], this.phoneExist.bind(this)],
        'city': ['', Validators.required],
        'password': ['', [Validators.required, Validators.minLength(6)]]
      });
      this.otpVerifyForm = this.form.group({
        'otp' : [null, Validators.required]
      });
      this.logForm = this.form.group({
        'email': [null, [Validators.required, Validators.email]],
        'password': ['', [Validators.required]]
      });
    });
  }

  emailExist(control: FormControl) {
    if (!control.hasError('email')) {
      const data = {field: 'email', val: control.value};
      const q = new Promise((resolve, reject) => {
        setTimeout(() => {
          this._apiService.checkUserData(data).subscribe(ret => {
            const $ret = ret.ret;
            if ($ret.code === 1) {
              resolve({'emailExist': true});
            } else {
              resolve(null);
            }
          }, err => {
            resolve(null);
          });

        }, 100);
      });
      return q;
    } else {
      return null;
    }
  }

  phoneExist(control: FormControl) {
    if (!control.hasError('phone')) {
      const data = {field: 'phone', val: control.value};
      const q = new Promise((resolve, reject) => {
        setTimeout(() => {
          this._apiService.checkUserData(data).subscribe(ret => {
            const $ret = ret.ret;
            if ($ret.code === 1) {
              resolve({'phoneExist': true});
            } else {
              resolve(null);
            }
          }, err => {
            resolve(null);
          });

        }, 100);
      });
      return q;
    } else {
      return null;
    }
  }

  listClick(event, newValue) {
    this.selectedItem = newValue;
    localStorage.setItem('selected_brand', this.selectedItem);
  }

  makeId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 15; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return 'guest' + text;
  }

  vote() {
    if (this.selectedItem) {
      this.submitvotetext = false;
      setTimeout(() => {
        this.submitvotetext = true;
      }, 15000);
      this.voteData = {
        category_id: this.category_id,
        company_id: this.selectedItem.toString(),
        survey_id: 2019,
        user_id: this.user_id,
        guest_id: this.guest_id
      };
      localStorage.setItem('vote_data', JSON.stringify(this.voteData));
      if (!this._apiService.loggedIn()) {
        this.login_warning = true;
      } else {
                this._apiService.isVerified().subscribe( resp => {
            if (resp.ret.data === 1) {
              this._apiService.submitVote(this.voteData).subscribe( resp1 => {
                if ( resp1.ret.code === 1) {
                  this.vote_submit = true;
                } else {
                  this.alreadyVoted = true;
                }
              });
            } else {
              const user = JSON.parse(localStorage.getItem('user'));
              this.sendOTP(user.email, user.phone);
              this.otp_verification_show = true;
            }
        });
      }
    } else {
      this.warning_submit = true;
    }
  }

  voteAsGuest() {
    this._apiService.submitVote(this.voteData).subscribe( resp => {
      if ( resp.ret.code === 1) {
        this.vote_submit = true;
        this.login_warning = false;
      } else {
        this.alreadyVoted = true;
      }
    });
  }

  close_warning_sumbit() {
    this.warning_submit = false;
  }

  close_login_warning() {
    this.login_warning = false;
    this.recheckLogin = true;
    // this.voteAsGuest();
    // this._commonService.setNavigationUrl('voting', this.category_id, 'ksp-voting-2018'); => register / login redirection old method
  }
recheck() {
  this.recheckLogin = false;
  this.login_warning = true;
}
recheckClose() {
  this.recheckLogin = false;
      this.voteAsGuest();
}
  close_vote_submit() {
    this.vote_submit = false;
    localStorage.removeItem('selected_brand');
    localStorage.removeItem('category');
    this.router.navigate(['/awards/2019']);
  }

  showLoginForm() {
    this.login_warning = false;
    this.login_form_show = true;
  }
  showOTPForm() {
    this.login_warning = false;
    this.otp_form_show = true;
  }
  showRegisterForm() {
    this.login_form_show = false;
    this.login_warning = true;
    this.otp_form_show = false;
  }

  close_login_form() {
    this.login_form_show = false;
    this.voteAsGuest();
  }
  close_otp_form() {
    this.otp_form_show = false;
  }

  close_otp() {
    this.otp_verification_show = false;
  }
verifyLoginOTP() {
  this.otperr = 0;
  if (this.otp) {
    this._apiService.loginWithOTP(this.otpemail, this.otp).subscribe(ret => {
      const $ret = ret.ret;
      if ($ret.code === 1) {
        this.otp_verification_show = false;
        this.showOTPNEW = false;
        this.showOTPNEW = false;
        this.otp_form_show = false;
        if ($ret.data[0]) {
          this._apiService.storeUserData($ret.data[0].api_token, $ret.data[0]);
        }
      }
    },
    err => {
    });
  } else {
    this.otperr = 1;
  }

}
close_otp1() {
  this.showOTPNEW = false;
}
sendLoginOTP() {
  this.showResendOTPText1 = false;
  setTimeout(() => {
    this.showResendOTPText1 = true;
  }, 15000);
  this.showerr = 0;
  if (this.otpemail) {
    this._apiService.sendEmailOTP(this.otpemail).subscribe(ret => {
      const $ret = ret.ret;
      if ($ret.code === 1) {
        this.showOTPNEW = true;
        this.otp_form_show = false;
        this.loginText = ret.ret.data + ' in your Email: ' + this.otpemail ;
      } else {
        this.loginText = 'Email ID not registered';
      }
    },
    err => {
    });
  } else {
    this.showerr = 1;
  }
}
  register(regData) {
    this.showRegButton = false;
    const userInfo = {
      'name' : regData.name,
      'email' : regData.email,
      'phone' : regData.phone,
      'city': regData.city,
      'password': regData.password,
    };
    this.isFormSubmitted = true;
    this._apiService.registerUserNew(userInfo).subscribe( ret => {
      this.isFormSubmitted = false;
      const resp = ret.ret;
      console.log(resp);
      if (resp.code === 1) {
        this.userData = resp.data;
        this.login_warning = false;
        this.otp_verification_show = true;
        this.userEmail = userInfo.email;
        this.userPhone = userInfo.phone;
        this.sendOTP(this.userEmail, this.userPhone);
        this.showRegButton = true;
        // this._apiService.storeUserData(resp.data.api_token, resp.data);
      } else {
        this.showRegButton = true;
        // this.loginText = resp.message;
      }
    }, err => {
      this.isFormSubmitted = false;
      this.showRegButton = true;
    });
  }

  sendOTP(email, phone) {
    this.showResendOTPText = false;
    setTimeout(() => {
      this.showResendOTPText = true;
    }, 15000);
    this.userEmail = email;
    this._apiService.sendOTPAwards({phone: phone, email: email}).subscribe(ret => {
      if ( ret.ret.code === 1 ) {
        this.otpVerifiedText = ret.ret.data + ' in your Email: ' + email + ' and mobile Number: ' + phone;
      }
    });
  }

  verifyOTP(otpVerifyForm) {
    console.log(otpVerifyForm);
    const otpInfo = {
      'otp' : otpVerifyForm.otp,
      'email' : this.userEmail,
      'phone' : this.userPhone
    };
    this.isOtpFormSubmitted = true;
    this._apiService.verifyOTPAwards(otpInfo).subscribe( ret => {
      this.isOtpFormSubmitted = false;
      const resp = ret.ret;
      if (resp.code === 1) {
        this.otpVerifiedText = resp.data;
         if (this.userData) {
          this._apiService.storeUserData(this.userData.api_token, this.userData);
         }
        this.otp_verification_show = false;
        this.showOTPNEW = false;
        this.vote();
      } else {
        this.otpVerifiedText = resp.data;
      }
    }, err => {
      this.isOtpFormSubmitted = false;
    });
  }

  resendOTP() {
    if (this.userEmail && this.userPhone)  {
      this.sendOTP(this.userEmail, this.userPhone);
      this.otpVerifiedText = 'Otp has been sent again.';
    } else {
      this.otpVerifiedText = 'Something went wrong.';
    }
  }

  login(logData) {
    const userInfo = {
      'email' : logData.email,
      'password' : logData.password,
    };
    this.isLogFormSubmitted = true;
    this._apiService.loginAwards(userInfo).subscribe( ret => {
      this.isLogFormSubmitted = false;
      const resp = ret.ret;
      if (resp.code === 0) {
        this.loginText = resp.data;
      } else if (resp.code === 1) {
        this._apiService.storeUserData(resp.data.api_token, resp.data);
        this.login_form_show = false;
        this.vote();
      } else if (resp.code === 22) {
        this.userData = resp.data;
        this.login_form_show = false;
        this.otp_verification_show = true;
        this.userEmail = resp.data.email;
        this.userPhone = resp.data.phone;
        this.sendOTP(this.userEmail, this.userPhone);
      }
    }, err => {
      this.isLogFormSubmitted = false;
    });
  }

  redirectToLogin() {
    this._commonService.setNavigationUrlLogin('awards', this.category_id, '');
  }
}
