import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import {MdDialog, MD_DIALOG_DATA} from '@angular/material';

declare var $: any;

@Component({
  selector: 'app-mobile-brand-dashboard',
  templateUrl: './mobile-brand-dashboard.component.html',
  styleUrls: ['./mobile-brand-dashboard.component.css']
})
export class MobileBrandDashboardComponent implements OnInit {

  profileForm: FormGroup;
  passwordForm: FormGroup;
  tmp_user_profile_details: any;
  nomimateMore: Boolean = false;
  categories: any = [];
  searchItems1: any = [];
  arr: any = [];
  registerForm: FormGroup;
  nomination: any = false;
  showSelectMore: any;
  user: any;
  submitted = false;
  catId: any = [];
  imageSrc: any;
  logo: any = '../../v1/assets/images/upload.png';
  logo1: any;
  thankYou: Boolean = false;
  haveSocal: Boolean = false;
  facebook_handle = '' ;
  twitter_handle = '';
  instagram_handle = '';
  showError = false;
  arr1: any = [];
  showErrormessage: any = 0;

  constructor(public _apiService: ApiService, public dialog: MdDialog, private form: FormBuilder) { }
  ngOnInit() {
    this.initiateProfileForm();
    this.initiatePasswordForm();
    this._apiService.getAwardCategory('5').subscribe(ret => {
      this.categories = ret['ret'].data;
      this.searchItems1 = this.categories;
    }, err => {
    });
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user.business_name);
    this.registerForm = this.form.group({
      categoryName: ['', Validators.required],
      companyName: [this.user['business_name'], Validators.required],
      companyLogo: ['' ,  Validators.required],
    });
    this._apiService.hasSocialId().subscribe(resp => {
      console.log(resp.ret.status);
      if (resp.ret.status !== true) {
        this.haveSocal = true;
      }
    });
  }

  /* Initiates Profile form. */
  initiateProfileForm() {
    /* Get user profile data and set industry type accordingly. */
    this.tmp_user_profile_details = this._apiService.getAuthUser();
    const industryArr = [
      'Advertising/ PR/ MR/ Events',
      'Education/ Teaching/ Trainning',
      'FMCG/Food/ Beverage',
      'Hotels/ Restaurant/ Airlines/ Travel',
      'Medical/ Healthcare/ Hospital',
      'Publishing',
      'Real Estate/Property',
      'Wellness/ Fitness/ Sports/ Beauty',
      'Others',
    ];

    if (industryArr.indexOf(this.tmp_user_profile_details.industry_type) == -1 && this.tmp_user_profile_details.industry_type != '') {
      this.tmp_user_profile_details.industry_type = 'Others';
      this.tmp_user_profile_details.other_industry_type = this._apiService.getAuthUser().industry_type;
    } else {
      this.tmp_user_profile_details.other_industry_type = '';
    }

    /* Set Validation for Profile form. */
    this.profileForm = this.form.group({
      'image_path': [this.tmp_user_profile_details.image_path],
      'name' : [this.tmp_user_profile_details.name, Validators.required],
      'last_name' : [this.tmp_user_profile_details.last_name, Validators.required],
      'business_name': [this.tmp_user_profile_details.business_name, Validators.required],
      'about_yourself': [this.tmp_user_profile_details.about_yourself, Validators.required],
      'address': [this.tmp_user_profile_details.address, Validators.required],
      'website': [this.tmp_user_profile_details.website, Validators.required],
      'industry_type': [this.tmp_user_profile_details.industry_type, Validators.required],
      'other_industry_type': [this.tmp_user_profile_details.other_industry_type, Validators.required]
    });
    this.checkIndustryType();
  }

  /* enable or disable validation for Other industry type.*/
  checkIndustryType() {
    if (this.profileForm.controls.industry_type.value == 'Others') {
      this.profileForm.controls.other_industry_type.enable();
    } else {
      this.profileForm.controls.other_industry_type.disable();
    }
  }

  /* Initiates Profile form. */
  initiatePasswordForm() {
    /* Set Validation for Password form. */
    this.passwordForm = this.form.group({
      'password': ['', Validators.required],
      'confirm_password' : ['', [Validators.required], this.passwordmisMatch.bind(this)]
    });
  }

  /* Compare Passwords*/
  passwordmisMatch(control: FormControl) {
    const q = new Promise((resolve, reject) => {
      if (control.value != this.passwordForm.get('password').value) {
        resolve ({passwordmisMatch: true});
      } else {
        resolve(null);
      }
    });
    return q;
  }

  /* change user Profile pic.*/
  userProfilePicChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this._apiService.uploadPhoto(file).subscribe(ret => {
        const $ret = ret.ret;
        if ($ret.code == 1){
          this.profileForm.patchValue({image_path: $ret.data[0]});
        }
      }, err => {
      });
    }
  }

  /* Update user data. */
  updateUserProfileDetails(profileData){
    $('#profile-left').modal('hide');
    this._apiService.updateBusinessUserProfileDetails(profileData).subscribe(ret => {
        const $ret = ret.ret;
        if ($ret.code == 1) {
          this._apiService.storeUserData($ret.data.api_token, $ret.data);
        }
        $('profile-left').modal('hide');
      },
      err => {});
  }

  /* Update Password.*/
  updatePassword(data){
    $('#change-password').modal('hide');
    this._apiService.updatePassword(data.password).subscribe(ret => {
      const $ret = ret.ret;
      if ($ret.code == 1){
        const dialogRef = this.dialog.open(MobileBrandDashboardDialog, {data: 'Password changed successfully'});
      }
    }, err => {
    });
  }

  /* Sends Advertise with us Email.*/
  sendAdvertiseMail() {
    const dialogRef = this.dialog.open(MobileBrandDashboardDialog, {data: 'Thank you! We have received your request. Our team will shortly get back to you.'});
    this._apiService.sendAdvertiseMail().subscribe(ret => { }, err => {});
  }

  /* Sends Host your workshop Email.*/
  sendWorkshopMail() {
    const dialogRef = this.dialog.open(MobileBrandDashboardDialog, {data: 'Thank you! We have received your request. Our team will shortly get back to you.'});
    this._apiService.sendWorkshopMail().subscribe(ret => { }, err => {});
  }
  nominateMoreCat() {
    this.nomimateMore = true;
  }
  filterCategories(val) {
    this.searchItems1 = this.categories.filter((item) => {
      return (item.category.toLowerCase().indexOf(val.toLowerCase()) > -1);
    });
  }
  clicked(event, item) {
    item.active = !item.active;
    const i = this.arr.indexOf(item.category);
    console.log(i);
    if (i == -1) {
      this.arr.push({category: item.category, id: item.id, img_path: item.img_path});
    } else {
      this.arr.splice(i, 1);
    }
  }
  catSubmit() {
    let value = '';
    for (let i = 0; i < this.arr.length ; i++) {
      value = value + this.arr[i].category + ' , ';
      this.catId.push(this.arr[i].id);
    }
    this.registerForm.controls['categoryName'].setValue(
      value
    );
    console.log(this.registerForm['_value']);
    this.nomimateMore = false;
    this.nomination = true;
    this.showSelectMore = '1';
  }

  closeNominationBrand() {
    this.nomination = false;
  }
  onSubmit() {
    this.showErrormessage = 0;
    console.log(this.logo1);
    if (this.logo1) {
      const data = new FormData();
      data.append('category_id', this.catId);
      data.append('logo', this.logo1);
      this._apiService.nominationSubmitByBrand(data).subscribe(ret => {
        if (ret['ret'].code === 1) {
          this.nomination = false;
          this.thankYou = true;
        }
      }, err => {
      });
    } else {
      this.showErrormessage = 1;
    }

  }
  importFile(event) {
    this.logo1 = event.target.files[0];
    console.log(this.logo1);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = ( event: any) => {
        this.imageSrc = event.target.result;
        this.logo = this.imageSrc;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  submitSocial() {
    if (this.facebook_handle === '' && this.twitter_handle === '' && this.instagram_handle === '') {
      this.showError = true;
    } else {
      const social_handel = new FormData();
      social_handel.append('facebook_handle', this.facebook_handle);
      social_handel.append('twitter_handle', this.twitter_handle);
      social_handel.append('instagram_handle', this.instagram_handle);
      this._apiService.submiSocialId(social_handel).subscribe(resp => {
          this.haveSocal = false;
          this.showError = false;
          this.facebook_handle = '';
          this.twitter_handle = '';
          this.instagram_handle = '';
        });
    }
  }
  closeHaveSocial() {
    this.haveSocal = false;
  }
  closeThankyou() {
    this.thankYou = false;
  }
}

@Component({
  selector: 'dialog-messages',
  templateUrl: './dialog-messages.html',
})
export class MobileBrandDashboardDialog {
  constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}
