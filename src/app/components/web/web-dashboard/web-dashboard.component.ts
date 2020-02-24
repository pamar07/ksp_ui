import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MD_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { NgxCarousel } from 'ngx-carousel';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

declare var tourObj: any;
declare var $: any;

@Component({
  selector: 'app-web-dashboard',
  templateUrl: './web-dashboard.component.html',
  styleUrls: ['./web-dashboard.component.css'],
  providers: [DatePipe]
})
export class WebDashboardComponent implements OnInit {

  public carouselOne: NgxCarousel;
  mealForm: FormGroup;
  bookForm: FormGroup;

  allPageBanners: any;
  bannerArticle: any;
  bannerPath: any;
  user: any;
  user_point: any;
  user_profile_details: any;
  child_details: any;
  cityList: any = [];
  // popularArticles:any;
  recommendedArticles: any;
  latestArticles: any;
  curatedArticles: any;
  mostLikedArticles: any;
  handpickedArticles: any;
  userEvents: any;
  recommendedEvents: any;
  userGroups: any;
  recommendedGroups: any;
  radios: any;
  tvs: any;
  tvsList: any;
  instagram: any;

  cityFilter: any;
  ageFilter: any;

  events: any;
  today: any;
  tomorrow: any;
  nextSaturday: any;
  nextSunday: any;
  pickedDate: any;
  selectedDate: any;
  selectedCity: any;

  todaySelected: boolean = false;
  tomorrowSelected: boolean = false;
  saturdaySelected: boolean = false;
  sundaySelected: boolean = false;
  pickedDateSelected: boolean = false;

  isLatestLoaded: boolean = false;
  // isLovedLoaded:boolean = false;
  isPopularLoaded: boolean = false;
  isTvLoaded: boolean = false;
  isRadioLoaded: boolean = false;

  showChangeParentalPrompt: boolean = false;
  forceCloseParentalPrompt: boolean = false;

  subscribeThanaks: any;
  pdfs: any = [];
  cityNameFilter: any = [];
  codeEvents: any = [];
  partners: any = [];

  cityForm: FormGroup;
  appForm: FormGroup;
  mobPattern = new RegExp(/^[1-9][0-9]{4,12}$/);

  latesArticles: any;
  isLatesLoaded: boolean = false;
  boxArray = [];
  private itemArray: any[][];
  itemsrc: any;
  src: any;
  currentDate: any;
  imageurl: any;
  constructor(
    public _apiService: ApiService,
    public _commonService: CommonService,
    public dialog: MdDialog,
    public _sanitizer: DomSanitizer,
    public _pipe: DatePipe,
    private form: FormBuilder
  ) {
    this.selectedDate = '';
    this.selectedCity = [];
    this.today = new Date();
    this.allPageBanners = [];
  }

  ngOnInit() {
    const today = new Date();
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1;
    const yyyy: any = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    this.currentDate = yyyy + '-' + mm + '-' + dd;
    console.log(this.currentDate);
    window.scrollTo(0, 0);
    this.carouselOne = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 400,
      interval: 3000,
      point: {
        visible: true,
        pointStyles: `
          .ngxcarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 0;
            margin: 0;
            white-space: nowrap;
            overflow: visible;
            position: absolute;
            width: auto;
            bottom: 6px;
            left: 46%;
            box-sizing: border-box;
          }
          .ngxcarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            background: rgba(255, 55, 119, 0.67);
            padding: 6px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngxcarouselPoint li.active {
              background: #ff3070;
              width: 20px;
          }
          /*.leftRs {
             position: absolute;
             margin: auto;
             top: 0;
             bottom: 0;
             width: 50px;
             height: 50px;
             box-shadow: 1px 2px 10px -1px rgba(0, 0, 0, .3);
             border-radius: 999px;
             left: 0;
         }

         .rightRs {
             position: absolute;
             margin: auto;
             top: 0;
             bottom: 0;
             width: 50px;
             height: 50px;
             box-shadow: 1px 2px 10px -1px rgba(0, 0, 0, .3);
             border-radius: 999px;
             right: 0;
         }*/

         .leftRs {
            position: absolute;
            margin: auto;
            top: 0;
            bottom: 0;
            width: 50px;
            height: 50px;
            /*box-shadow: 1px 2px 10px -1px rgba(0, 0, 0, .3);*/
            border-radius: 999px;
            left: 30px;
            background-color: rgba(0,0,0,0.4);
            border:0;
            color:#fff;
        }

        .rightRs {
            position: absolute;
            margin: auto;
            top: 0;
            bottom: 0;
            width: 50px;
            height: 50px;
            /*box-shadow: 1px 2px 10px -1px rgba(0, 0, 0, .3);*/
            border-radius: 999px;
            right: 30px;
            background-color: rgba(0,0,0,0.4);
            border:0;
            color:#fff;
        }

        .leftRs:focus, .leftRs:visited, .leftRs:active{
          outline: none!important;
        }

        .rightRs:focus, .rightRs:visited, .rightRs:active{
          outline: none!important;
        }

        .leftRs:hover{
          background-color: rgba(0,0,0,0.6)!important;
          transition: all 0.5s ease-in-out;
        }

        .rightRs:hover{
          background-color: rgba(0,0,0,0.6)!important;
          transition: all 0.5s ease-in-out;
        }
        `
      },
      load: 3,
      touch: true,
      loop: true,
      easing: 'ease',
      custom: 'banner'
    }
    this.user = JSON.parse(localStorage.getItem('user'));
    this.today = new Date();
    this.tomorrow = new Date();
    this.nextSaturday = this.nextDate(6);
    this.nextSunday = this.nextDate(0);
    this.pickedDate = '';
    this.tomorrow = this.tomorrow.setDate(this.tomorrow.getDate() + 1);

    /* parental status prompt. */
    if (this.user.family_status == '1') {
      if (new Date(this.user.babyplan) < new Date()) {
        this.showChangeParentalPrompt = true;
      }
    }
    else if (this.user.family_status == '2') {
      if (new Date(this.user.babydue) < new Date()) {
        this.showChangeParentalPrompt = true;
      }
    }

    /* Get Cities List. */
    this._apiService.getCities().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.cityList = $ret.data;
        console.log(this.cityList);

        /* Prompt user for the city. */
        if (!this._apiService.getAuthUser().city) {
          setTimeout(function () { $('#user-city').modal('show'); }, 3000);
        }

      } else {
        this.cityList = [];
      }
    }, err => {
    });

    this.updateLatestArticle();
    let userCity: any = [];
    userCity[0] = this._apiService.getAuthUser().city;

    /* Get Banners */
    this._apiService.getBannerArticle(5, 1).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.bannerArticle = $ret.data;
        console.log(this.bannerArticle)

        this.bannerArticle = this.bannerArticle.filter(item => (!item.city || (item.city && (item.city.indexOf('National') !== -1 || item.city == '' || item.city.indexOf(this._apiService.getAuthUser().city) !== -1))));

        this.bannerArticle = this.bannerArticle.filter(item => (!item.age_group || (item.age_group && (item.age_group == '' || item.age_group.indexOf(this._apiService.getAuthUser().family_status) !== -1))));

        this.bannerPath = [];
        for (let i = 0; i < this.bannerArticle.length; i++) {
          if (this.bannerArticle[i].post_type == 'post') {
            this.bannerPath[i] = 'article-individual';

          } else if (this.bannerArticle[i].post_type == 'videos') {
            this.bannerPath[i] = 'tv-individual';

          } else if (this.bannerArticle[i].post_type == 'ksp-radio') {
            this.bannerPath[i] = 'radio-individual';

          } else if (this.bannerArticle[i].bannerContentType == 3) {
            this.bannerPath[i] = '/resultPage/banner/' + this.bannerArticle[i].id;
          }
        }
      } else {
        this.bannerArticle = [];
      }
    }, err => {
    });

    /* Recommeded Events */
    this._apiService.getEventsCityAndDatewise(3, 1, userCity).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.recommendedEvents = $ret.data;
      } else {
        this.recommendedEvents = [];
      }
    }, err => {
    });

    /* Get user events */
    this._apiService.getUserEvents().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.userEvents = $ret.data;
      } else {
        this.userEvents = [];
      }
    }, err => {
    });

    /* Get User groups */
    this._apiService.getUserGroups().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.userGroups = $ret.data;
      } else {
        this.userGroups = [];
      }
    }, err => {
    });

    /* Get Handpicked Articles */
    this._apiService.getArticlesHandpicked(5).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.handpickedArticles = $ret.data;
      } else {
        this.handpickedArticles = [];
      }
    }, err => {
    });

    /* Get Instagaram Pics */
    this._apiService.getInstagram().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
         if($ret.data.data) {
          if ($ret.data.data.length > 6) {
            this.instagram = $ret.data.data;
            this.instagram.splice(6, this.instagram.length - 6);
          }
          else {
            this.instagram = $ret.data;
          }
         }
      } else {
        this.instagram = [];
      }
    }, err => {
    });

    /* Get Events */
    this._apiService.getEventsCityAndDatewise(3, 1, this.selectedCity, this.selectedDate).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.events = $ret.data;
      } else {
        this.events = [];
      }
    }, err => {
    });

    if (this.user.tour_completed == "0") {
      //tourObj.takeTour();
      this._apiService.updateTourCompleted().subscribe(ret => {
        let $ret = ret.ret;
        //console.log(ret);
        if ($ret.code == 1) {
        }
      }, err => {
      });
      let user = JSON.parse(localStorage.getItem('user'));
      user.tour_completed = "1";
      this._apiService.storeUserData(localStorage.getItem('token'), user);
    }

    /* Get all page banners */
    this._apiService.getAllPageBanners(this._commonService.noOfAllPageBanners).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.allPageBanners = $ret.data;
      } else {
        this.allPageBanners = [];
      }
    }, err => {
    });

    this.cityForm = this.form.group({
      'city': ['', [Validators.required]],
      'cityOther': [null, []],
    });

    this.mealForm = this.form.group({
      'email': [null, [Validators.required, Validators.email]],
    });

    this.bookForm = this.form.group({
      'email': [null, [Validators.required, Validators.email]],
    });

    this.appForm = this.form.group({
      'mobile': [null, [Validators.required, Validators.pattern(this.mobPattern)]],
    });

    /* fetch code events*/
    this._apiService.getKspEvents(1, 3).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.codeEvents = $ret.data;
      } else {
        this.codeEvents = [];
      }
    }, err => {
    });

    /* fetch code partners*/
    this._apiService.getKspPartners().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.partners = $ret.data;
        if (this.partners.length > 8) {
          this.partners = this.partners.slice(0, 4);
        }
      } else {
        this.partners = [];
      }
    }, err => {
    });
    this.updateLatesArticle()
  }
  updateLatesArticle() {
    this._apiService.kspShopContents().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 0) {
        //this.latestArticles = $ret.data;
        //console.log($ret.result);
        console.log($ret.result[0].item_details);
        this.boxArray = $ret.result;
        this.boxArray = this.boxArray.slice(0, 3);
        console.log(this.boxArray);
        // for (let i = 0 ; i <= $ret.result.length; i++) {
        //   if($ret.result[i].type === 0) {
        //     this.boxArray.push($ret.result[i]);
        //     this.boxArray = this.boxArray.slice(0, 3);
        //   }
        // }

        // for(let i=0;i<this.boxArray.length;i++){
        //   console.log(this.boxArray[i].name);

        //  }

        // console.log($ret.result[0].item_details);
        // this.itemArray = $ret.result[0].item_details;
        // this.itemsrc = $ret.result[0].image_path;
        this.src = $ret.result[0].box_image;
        this.isLatesLoaded = true;

        //this.itemArray = $ret.result;

      } else {
        this.latesArticles = [];
      }
    }, err => {
    });
  }
  submitmealForm(data) {
    this._apiService.subscribeNewsletter(data.email, 1).subscribe(ret => {
      let $ret = ret.status;
      if ($ret == "Email id is already subscribed") {
        this.subscribeThanaks = 'Email id is already subscribed.';
        $('#thanksSubscribe').modal('show');
      } else {
        this.subscribeThanaks = 'Thank you for subscribing.';
        $('#thanksSubscribe').modal('show');
      }
      this.mealForm.patchValue({ email: '' });
      this.mealForm.controls['email'].setErrors(null);
    }, err => {
    });
  }

  submitbookForm(data) {
    this._apiService.subscribeBookletter(data.email).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.subscribeThanaks = $ret.data.msg;
      } else {
        this.subscribeThanaks = 'There is some network error, Please try after sometime.';
      }

      $('#thanksSubscribe').modal('show');
      this.bookForm.patchValue({ email: '' });
      this.bookForm.controls['email'].setErrors(null);
    }, err => {
    });
  }

  submitAppForm(data) {
    this._apiService.sendAppLink(data.mobile).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.subscribeThanaks = $ret.data.msg;
      } else {
        this.subscribeThanaks = 'There is some network error, Please try after sometime.';
      }

      $('#thanksSubscribe').modal('show');
      this.appForm.patchValue({ mobile: '' });
      this.appForm.controls['mobile'].setErrors(null);
    }, err => {
    });
  }

  /* City Popup */
  checkCity() {
    if (this.cityForm.controls.city.value == 'National') {
      this.cityForm.get('cityOther').setValidators([Validators.required]);
    } else {
      this.cityForm.get('cityOther').setValidators([]);
    }
    this.cityForm.controls.cityOther.updateValueAndValidity();
  }

  submitCityForm(data) {
    this._apiService.updateUserCity({ city: data.city, cityOther: data.cityOther }).subscribe(ret => {
      $('#user-city').modal('hide');
      let $ret = ret.ret;
      if ($ret.code == 1) {
        let user = this._apiService.getAuthUser();
        let token = localStorage.getItem('token');
        user.city = data.city;
        user.cityOther = data.city == 'National' ? data.cityOther : '';
        this._apiService.storeUserData(token, user);
      }
    },
      err => {
      });
  }

  /* City Popup */
  join(group_id, group_name) {
    let dialogRef = this.dialog.open(GroupJoinDialog, { data: group_name });
    dialogRef.afterClosed().subscribe(result => {
      let dialogRes = result;
      //console.log('Dialog result: '+result);
      if (result == true) {
        this._apiService.joinGroup(group_id).subscribe(ret => {
          let $ret = ret.ret;
          //console.log($ret);
          if ($ret.code == 1) {
            this._apiService.getUserGroups().subscribe(ret => {
              let $ret = ret.ret;
              if ($ret.code == 1) {
                this.userGroups = $ret.data;
              } else {
                this.userGroups = [];
              }
            }, err => {
            });
            this._apiService.getAllGroups(4, this.cityFilter).subscribe(ret => {
              let $ret = ret.ret;
              if ($ret.code == 1) {
                this.recommendedGroups = $ret.data;
              } else {
                this.recommendedGroups = [];
              }
            }, err => {
            });
            //this.join_status = 'REQUEST SENT';
          } else {
          }
        }, err => {
        });
      }
    });

  }

  updateRecommendedGroups() {
    this._apiService.getAllGroups(4, this.cityFilter).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.recommendedGroups = $ret.data;
      } else {
        this.recommendedGroups = [];
      }
    }, err => {
    });
  }

  // updateMostLovedArticle(){
  //   this._apiService.getArticlesMostLoved(1,4,this.cityFilter,this.ageFilter).subscribe(ret=>{
  //     let $ret = ret.ret;
  //     if($ret.code == 1){
  //       this.popularArticles = $ret.data.popular;
  //     }else{
  //       this.popularArticles = [];
  //     }
  //   },err=>{
  //   });
  // }

  updateRecommendedArticle() {
    this._apiService.getArticlesRecommended(1, 4, this.cityFilter, this.ageFilter).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.recommendedArticles = $ret.data.recommended;
        this.isPopularLoaded = true;
      } else {
        this.recommendedArticles = [];
      }
    }, err => {
    });
  }

  updateLatestArticle() {
    this._apiService.kspTodayContents(3, this.cityFilter, this.ageFilter).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.latestArticles = $ret.data;
        this.isLatestLoaded = true;
      } else {
        this.latestArticles = [];
      }
    }, err => {
    });
  }

  updateRadio() {
    this._apiService.getRadio(0, 4, this.cityFilter, this.ageFilter).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.radios = $ret.data;
        this.isRadioLoaded = true;
      } else {
        this.radios = [];
      }
    }, err => {
    });
  }
  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  updateTv() {
    this._apiService.getTv(0, 5, this.cityFilter, this.ageFilter).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.tvs = $ret.data[0];
        this.tvsList = $ret.data;
        this.tvs.path = this.safeUrl(this.tvs.path + "?autoplay=0;autoplay=0&mute=1");
        console.log(this.tvs.path);
        // this.tvsList.splice(0,1);
        for (let i = 0; i < this.tvsList.length; i++) {
          const thumb = this.tvsList[i].thumbnail.split('/');
          console.log(thumb[2]);
          if (thumb[2] === 'd2riyb99hqtj11.cloudfront.net') {
            this.imageurl = this.tvsList[i].thumbnail;
            let haystack = this.imageurl;
            let needle = '/';
            let replacement = '/w_100/';
            haystack = Array.from(haystack).reverse().join('');
            needle = Array.from(needle).reverse().join('');
            replacement = Array.from(replacement).reverse().join('');
            haystack = haystack.replace(needle, replacement);
            const results = Array.from(haystack).reverse().join('');
            this.tvsList[i].thumbnail = results;
          }
        }
        console.log(this.tvsList);
        this.isTvLoaded = true;
      } else {
        this.tvs = [];
      }
    }, err => {
    });
  }

  getFirstName(name) {
    let firstName = name.split(' ');
    return firstName[0];
  }

  calculateAge(birthday) {
    let today = new Date();
    birthday = new Date(birthday);

    let diff = Math.floor(today.getTime() - birthday.getTime());
    let day = 1000 * 60 * 60 * 24;

    let days = Math.floor(diff / day);
    let months = Math.floor(days / 31);
    let years = Math.floor(months / 12);

    let age = '';
    if (years > 0) {
      if (years == 1) {
        age = age + years + ' year old';
      }
      else {
        age = age + years + ' years old';
      }
      days = days - months * 31;
      months = months - years * 12;
    }
    if (months > 0 && years == 0) {
      if (months == 1) {
        age = age + months + ' month old';
      }
      else {
        age = age + months + ' months old';
      }
    }
    if (days > 0 && months == 0 && years == 0) {
      if (days == 1) {
        age = age + days + ' day old';
      }
      else {
        age = age + days + ' days old';
      }
    }
    return age;
  }

  updatePdfs() {
    this._apiService.getPdfs(1, 3, this.cityNameFilter, this.ageFilter).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.pdfs = $ret.data.pdfs;
      } else {
        this.pdfs = [];
      }
    }, err => {
    });
  }



  filterCity(cityList) {
    let cityNames = [];
    let filtercity = [];
    for (let i = 0; i < cityList.length; i++) {
      cityNames[i] = cityList[i].id;
      filtercity[i] = cityList[i].city;
    }
    this.cityFilter = cityNames;
    this.cityNameFilter = filtercity;
    //this.isLatestLoaded = false;
    this.isPopularLoaded = false;
    this.isTvLoaded = false;
    this.isRadioLoaded = false;
    this.updateLatestArticle();
    this.updateRecommendedArticle();
    // this.updateMostLovedArticle();
    this.updateRadio();
    this.updateTv();
    this.updateRecommendedGroups();
    this.updatePdfs();
  }

  filterAge(ageList) {
    let ageIds = [];
    for (let i = 0; i < ageList.length; i++) {
      ageIds[i] = ageList[i].id;
    }
    this.ageFilter = ageIds;
    //this.isLatestLoaded = false;
    this.isPopularLoaded = false;
    this.isTvLoaded = false;
    this.isRadioLoaded = false;
    this.updateLatestArticle();
    this.updateRecommendedArticle();
    // this.updateMostLovedArticle();
    this.updateRadio();
    this.updateTv();
    this.updateRecommendedGroups();
    this.updatePdfs();
  }

  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  safeStyle(style) {
    return this._sanitizer.bypassSecurityTrustStyle(style);
  }

  resetEventFilters() {
    this.todaySelected = false;
    this.tomorrowSelected = false;
    this.saturdaySelected = false;
    this.sundaySelected = false;
    this.pickedDateSelected = false;
    for (let i = 0; i < this.cityList.length; i++) {
      this.cityList[i].checked = false;
    }
    this.selectedDate = '';
    this.selectedCity = [];
    this.filterEvents();
  }

  getEventsDatewise(date, btn_id) {
    if (btn_id == 1) { /* 1: for indicating today button is clicked*/
      this.todaySelected = true;
      this.tomorrowSelected = false;
      this.saturdaySelected = false;
      this.sundaySelected = false;
      this.pickedDateSelected = false;
    }
    else if (btn_id == 2) { /* 5: for indicating tomorrow button is clicked*/
      this.todaySelected = false;
      this.tomorrowSelected = true;
      this.saturdaySelected = false;
      this.sundaySelected = false;
      this.pickedDateSelected = false;
    }
    else if (btn_id == 3) { /* 5: for indicating saturday button is clicked*/
      this.todaySelected = false;
      this.tomorrowSelected = false;
      this.saturdaySelected = true;
      this.sundaySelected = false;
      this.pickedDateSelected = false;
    }
    else if (btn_id == 4) { /* 5: for indicating sunday button is clicked*/
      this.todaySelected = false;
      this.tomorrowSelected = false;
      this.saturdaySelected = false;
      this.sundaySelected = true;
      this.pickedDateSelected = false;
    }
    else { /* 5: for indicating pick a date button is clicked*/
      this.todaySelected = false;
      this.tomorrowSelected = false;
      this.saturdaySelected = false;
      this.sundaySelected = false;
      this.pickedDateSelected = true;
    }
    if (date) {
      date = new Date(date);
      let newDate = this._pipe.transform(date, 'yyyy-MM-dd');
      this.selectedDate = newDate;
      this.filterEvents();
    }
  }

  getEventsCitywise(city, id) {
    this.cityList[id].checked = !this.cityList[id].checked;
    let checkedCities: any = [];
    let index = -1;
    for (let i = 0; i < this.cityList.length; i++) {
      if (i == id) {
        this.cityList[i].checked = true;
        checkedCities[++index] = this.cityList[i].city;
      }
      else {
        this.cityList[i].checked = false;
      }
    }
    // for(let i=0; i<this.cityList.length; i++){
    //   if(this.cityList[i].checked == true){
    //     checkedCities[++index]=this.cityList[i].city;
    //   }
    // }
    this.selectedCity = checkedCities;
    this.filterEvents();
  }

  filterEvents() {
    this._apiService.getEventsCityAndDatewise(3, 1, this.selectedCity, this.selectedDate).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.events = $ret.data;
      } else {
        this.events = [];
      }
    }, err => {
    });
  }

  updateCuratedArticle() {
    this._apiService.curatedContents(1, 9).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.curatedArticles = $ret.data[0];
        console.log(this.curatedArticles);
        //this.isLatestLoaded = true;
      } else {
        this.curatedArticles = [];
      }
    }, err => {
    });
  }

  nextDate(dayIndex) {
    let date = new Date();
    date.setDate(date.getDate() + (dayIndex - 1 - date.getDay() + 7) % 7 + 1);
    return date;
  }

  onDateInput(e) {
    this.pickedDate = e.value;
    this.getEventsDatewise(this.pickedDate, 5); /* 5: for indicating pick a date button is clicked*/
  }

  bannerClickIntentCapture(path, entity_id?) {
    this._apiService.bannerClickIntent(path, 'click', entity_id).subscribe(ret => {
    });
  }

  bannerClickIntentCaptureShowPopup(banner, path, entity_id?) {
    this._apiService.bannerClickIntent(path, 'click', entity_id).subscribe(ret => {
    });
    this.subscribeThanaks = banner.popup_text;
    $('#thanksSubscribe').modal('show');
  }

  bannerViewIntentCapture(path, entity_id?) {
    this._apiService.bannerClickIntent(path, 'view', entity_id).subscribe(ret => {
    });
  }


  public myfunc(event: Event) {
    // carouselLoad will trigger this funnction when your load value reaches
    // it is helps to load the data by parts to increase the performance of the app
    // must use feature to all carousel
  }
  getOnlyDate(date) {
    let newDate;
    if (date != null) {
      newDate = date.split(' ').join('T') + '+05:30';
      newDate = new Date(newDate);
    }
    else {
      newDate = new Date();
    }
    return this._pipe.transform(new Date(newDate), 'yyyy-MM-dd');
  }
}

@Component({
  selector: 'dialog-messages',
  templateUrl: './dialog-messages.html',
})
export class GroupJoinDialog {
  constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}
