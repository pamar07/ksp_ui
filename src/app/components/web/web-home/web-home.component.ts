import { Component, OnInit, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxCarousel } from 'ngx-carousel';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

declare var signupModalObj: any;
declare var awardsModalObj: any;
declare var $: any;

@Component({
  selector: 'app-web-home',
  templateUrl: './web-home.component.html',
  styleUrls: ['./web-home.component.css'],
  providers: [DatePipe]
})
export class WebHomeComponent implements OnInit {

  public carouselOne: NgxCarousel;
  mealForm: FormGroup;
  bookForm: FormGroup;
  appForm: FormGroup;

  recommendedArticlesTemp = [];
  allPageBanners: any;
  bannerArticle: any;
  bannerPath: any;
  latestArticles: any;
  latestArticlesDummy: any;
  recommendedArticles: any;
  popularArticles: any;
  events: any;
  groups: any;
  radios: any;
  tvs: any;
  tvsList: any;
  testimonials: any;
  cityList: any;
  instagram: any;
  codeEvents: any = [];
  partners: any = [];
  categorywiseArticle: any;
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


  cityFilter: any;
  ageFilter: any;

  isLatestLoaded: boolean = false;
  isPopularLoaded: boolean = false;
  isTvLoaded: boolean = false;
  isRadioLoaded: boolean = false;

  bannerTabSelected: number;

  articleText: string;
  groupText: string;
  eventText: string;
  radioText: string;
  tvText: string;

  subscribeThanaks: any;
  pdfs: any = [];
  cityNameFilter: any = [];
  mobPattern = new RegExp(/^[1-9][0-9]{4,12}$/);

  latesArticles: any;
  isLatesLoaded: boolean = false;
  boxArray = [];
  private itemArray: any[][];
  itemsrc: any;
  src: any;
  currentDate: any;
  constructor(
    public _apiService: ApiService,
    public _commonService: CommonService,
    public _router: Router,
    public _sanitizer: DomSanitizer,
    public _pipe: DatePipe,
    private form: FormBuilder
  ) {
    this.bannerTabSelected = 0;
    this.selectedDate = '';
    this.selectedCity = [];
    this.cityFilter = [];
    this.ageFilter = [];

    this.articleText = "";
    this.groupText = "";
    this.eventText = "";
    this.radioText = "";
    this.tvText = "";
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
    this.today = new Date();
    this.tomorrow = new Date();
    this.nextSaturday = this.nextDate(6);
    this.nextSunday = this.nextDate(0);
    this.pickedDate = '';
    this.tomorrow = this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    if (this._apiService.loggedIn()) {
      this._router.navigate(['/dashboard']);
    }
    else {
      // signupModalObj.display(); //temporally closed for awards
      this._apiService.getCities().subscribe(ret => {
        let $ret = ret.ret;
        if ($ret.code == 1) {
          this.cityList = $ret.data;

          for (let i = 0; i < this.cityList.length; i++) {
            this.cityList[i].checked = false;
          }
        } else {
          this.cityList = [];
        }
      }, err => {
      });

      this._apiService.getBannerArticle(6, 0).subscribe(ret => {
        let $ret = ret.ret;
        if ($ret.code == 1) {
          this.bannerArticle = $ret.data;
          this.bannerArticle = this.bannerArticle.filter
          (item => (!item.city || (item.city && (item.city.indexOf('National') !== -1 || item.city == ''))));

          this.bannerArticle = this.bannerArticle.filter(item => (!item.age_group || (item.age_group && item.age_group == '')));

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

      /* Events */
      this._apiService.getEventsCityAndDatewise(3, 1, this.selectedCity, this.selectedDate).subscribe(ret => {
        let $ret = ret.ret;
        if ($ret.code == 1) {
          this.events = $ret.data;
        } else {
          this.events = [];
        }
      }, err => {
      });



      this.updateLatestArticle();
      this.updateRecommendedArticle();
      // this.updateMostLovedArticle();
      this.updateRecommendedGroups();

      this._apiService.getCategorywiseArticle(3).subscribe(ret => {
        let $ret = ret.ret;
        if ($ret.code == 1) {
          this.categorywiseArticle = $ret.data.articles;
        } else {
          this.categorywiseArticle = [];
        }
      }, err => {
      });

      this.updateRadio();
      this.updateTv();
      this.fetchTestimonial();
      this.fetchCodeEvents();
      this.fetchKspPartners();

      this._apiService.getInstagram().subscribe(ret => {
        let $ret = ret.ret;
        if ($ret.code == 1) {
          if ($ret.data.meta.length > 6) {
            this.instagram = $ret.data.meta;
            this.instagram.splice(6, this.instagram.length - 6);
          }
          else {
            this.instagram = $ret.data;
          }
        } else {
          this.instagram = [];
        }
      }, err => {
      });

      this._apiService.anyPageview('/home', 'home').subscribe(ret => {
        let $ret = ret.ret;
      }, err => {
      });

      this._apiService.getAllPageBanners(this._commonService.noOfAllPageBanners).subscribe(ret => {
        let $ret = ret.ret;
        if ($ret.code == 1) {
          this.allPageBanners = $ret.data;
        } else {
          this.allPageBanners = [];
        }
      }, err => {
      });

      /* Get PDFS */
      this.updatePdfs();
    }

    this.mealForm = this.form.group({
      'email': [null, [Validators.required, Validators.email]],
    });

    this.bookForm = this.form.group({
      'email': [null, [Validators.required, Validators.email]],
    });

    this.appForm = this.form.group({
      'mobile': [null, [Validators.required, Validators.pattern(this.mobPattern)]],
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

  nextDate(dayIndex) {
    let date = new Date();
    date.setDate(date.getDate() + (dayIndex - 1 - date.getDay() + 7) % 7 + 1);
    return date;
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

  safeStyle(style) {
    return this._sanitizer.bypassSecurityTrustStyle(style);
  }

  fetchTestimonial() {
    this._apiService.fetchTestimonial().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.testimonials = $ret.data;
      } else {
        this.testimonials = [];
      }
    }, err => {
    });
  }

  fetchCodeEvents() {
    this._apiService.getKspEvents(1, 3).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.codeEvents = $ret.data;
      } else {
        this.codeEvents = [];
      }
    }, err => {
    });
  }

  fetchKspPartners() {
    this._apiService.getKspPartners().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.partners = $ret.data;
        if (this.partners.length > 8) {
          this.partners = this.partners.slice(0, 3);
        }
      } else {
        this.partners = [];
      }
    }, err => {
    });
  }

  updateRecommendedGroups() {
    this._apiService.getAllGroups(3, this.cityFilter).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.groups = $ret.data;
      } else {
        this.groups = [];
      }
    }, err => {
    });
  }

  /* ksp today for filtering with city and age groups */
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

  // updateMostLovedArticle(){
  //   this._apiService.getArticlesMostLoved(1,12,this.cityFilter,this.ageFilter).subscribe(ret=>{
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
    this._apiService.getArticlesRecommended(1, 3, this.cityFilter, this.ageFilter).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.recommendedArticlesTemp = $ret.data.recommended;
        var tempArt = this.recommendedArticlesTemp.slice(0, 3);
        this.recommendedArticles = $ret.data.recommended;
        this.isPopularLoaded = true;
      } else {
        this.recommendedArticles = [];
      }
    }, err => {
    });
  }

  updateRadio() {
    this._apiService.getRadio(0, 3, this.cityFilter, this.ageFilter).subscribe(ret => {
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
        this.tvsList.splice(0, 1);
        this.isTvLoaded = true;
      } else {
        this.tvs = [];
      }
    }, err => {
    });
  }

  updateCategorywiseArticle() {
    this._apiService.getCategorywiseArticle(3).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.categorywiseArticle = $ret.data.articles;
      } else {
        this.categorywiseArticle = [];
      }
    }, err => {
    });
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
  onDateInput(e) {
    this.pickedDate = e.value;
    this.getEventsDatewise(this.pickedDate, 5); /* 5: for indicating pick a date button is clicked*/
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

  bannerClickIntentCapture(path, entity_id?) {
    this._apiService.bannerClickIntent(path, 'click', entity_id).subscribe(ret => { });
  }

  bannerViewIntentCapture(path, entity_id?) {
    this._apiService.bannerClickIntent(path, 'view', entity_id).subscribe(ret => { });
  }

  public myfunc(event: Event) { }
}
