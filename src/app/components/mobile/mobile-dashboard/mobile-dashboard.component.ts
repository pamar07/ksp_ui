import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MD_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { NgxCarousel } from 'ngx-carousel';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

declare var scObj: any;
declare var $: any;

@Component({
  selector: 'app-mobile-dashboard',
  templateUrl: './mobile-dashboard.component.html',
  styleUrls: ['./mobile-dashboard.component.css'],
  providers: [DatePipe]
})
export class MobileDashboardComponent implements OnInit {

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
  cityList: any;
  popularArticles: any;
  recommendedArticles: any;
  latestArticles: any;
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
  codeEvents: any = [];
  partners: any = [];

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
  isPopularLoaded: boolean = false;
  isTvLoaded: boolean = false;
  isRadioLoaded: boolean = false;

  masterCategoryList: any;
  categoryList: any;
  master_cat_id: any;
  cat_id: any;
  tab_selected: any;
  categoryArticle: any;



  // magazine
  cityNameFilter: any;
  pdfs: any = [];
  // magazine

  subscribeThanaks: any;

  cityForm: FormGroup;

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
    public dialog: MdDialog,
    public _sanitizer: DomSanitizer,
    public _pipe: DatePipe,
    private form: FormBuilder
  ) {
    this.selectedDate = '';
    this.selectedCity = [];
    this.masterCategoryList = [];
    this.cat_id = [];
    this.userGroups = [];
    this.recommendedGroups = [];
    this.popularArticles = [];
    this.recommendedArticles = [];
    this.handpickedArticles = [];
    this.bannerArticle = [];
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
    this.updatePdfs();
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
            left: 41%;
            box-sizing: border-box;
          }
          .ngxcarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            background: rgba(255, 55, 119, 0.67);
            padding: 3px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngxcarouselPoint li.active {
              background: #ff3070;
              width: 10px;
          }
          .leftRs {
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
         }
        `
      },
      load: 3,
      touch: true,
      loop: true,
      easing: 'ease',
      custom: 'banner'
    }

    this._apiService.getBannerArticle(5, 1).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.bannerArticle = $ret.data;
        this.bannerArticle = this.bannerArticle.filter(item => (!item.city || (item.city && (item.city.indexOf('National') !== -1 || item.city == '' || item.city.indexOf(this._apiService.getAuthUser().city) !== -1))));

        this.bannerArticle = this.bannerArticle.filter(item => (!item.age_group || (item.age_group && (item.age_group == '' || item.age_group.indexOf(this._apiService.getAuthUser().family_status) !== -1))));

        this.bannerArticle = this.bannerArticle.filter(item => (item.mobile_image != "" && item.mobile_image != null));
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

    this.user = JSON.parse(localStorage.getItem('user'));
    this.today = new Date();
    this.tomorrow = new Date();
    this.nextSaturday = this.nextDate(6);
    this.nextSunday = this.nextDate(0);
    this.pickedDate = '';
    this.tomorrow = this.tomorrow.setDate(this.tomorrow.getDate() + 1);

    this._apiService.getCities().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.cityList = $ret.data;

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

    this._apiService.getEventsCityAndDatewise(3, 1, userCity).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.recommendedEvents = $ret.data;
      } else {
        this.recommendedEvents = [];
      }
    }, err => {
    });


    /* Get user Events */
    this._apiService.getUserEvents().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.userEvents = $ret.data;
      } else {
        this.userEvents = [];
      }
    }, err => {
    });



    this._apiService.getMasterCategories().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        let mostRecentPost: any;
        this._apiService.getArticlesRecent(1, 1).subscribe(ret1 => {
          let $ret1 = ret1.ret;
          if ($ret1.code == 1) {
            mostRecentPost = $ret1.data.recent[0];

            this.masterCategoryList = $ret.data.master_categories.filter(cat => cat.type == 0);
            this.categoryList = $ret.data.sub_categories.filter(cat => cat.type == 0);
            let masterId = 0;
            for (let i = 0; i < this.categoryList.length; i++) {
              if (this.categoryList[i].id == mostRecentPost.category[0].category_id) {
                masterId = this.categoryList[i].parent_id;
              }
            }
            this.tab_selected = masterId - 1;
            this.showCategoryArticle(masterId);
          } else {
            mostRecentPost = [];
          }
        }, err => {
        });
      } else {
        this.masterCategoryList = [];
        this.categoryList = [];
      }
    }, err => {
    });

    this._apiService.getUserGroups().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.userGroups = $ret.data;
      } else {
        this.userGroups = [];
      }
    }, err => {
    });

    this._apiService.getAllGroups(4).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.recommendedGroups = $ret.data;
      } else {
        this.recommendedGroups = [];
      }
    }, err => {
    });

    this._apiService.getArticlesHandpicked(5).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.handpickedArticles = $ret.data;
      } else {
        this.handpickedArticles = [];
      }
    }, err => {
    });

    this.updateRadio();
    this.updateTv();


    this.fetchCodeEvents();
    this.fetchKspPartners();

    this._apiService.getInstagram().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        if ($ret.data.data.length > 6) {
          this.instagram = $ret.data.data;
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

    this._apiService.getAllPageBanners(this._commonService.noOfAllPageBanners).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.allPageBanners = $ret.data;
      } else {
        this.allPageBanners = [];
      }
    }, err => {
    });

    /* City form */
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
    let dialogRef = this.dialog.open(GroupJoinDialogMobile, { data: group_name });
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
            this._apiService.getAllGroups(4).subscribe(ret => {
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
    // this._apiService.getArticlesRecent(1,12).subscribe(ret=>{
    //   let $ret = ret.ret;
    //   if($ret.code == 1){
    //     this.latestArticles = $ret.data.recent;
    //     this.isLatestLoaded = true;
    //   }else{
    //     this.latestArticles = [];
    //   }
    // },err=>{
    // });
    this._apiService.kspTodayContents(4, this.cityFilter, this.ageFilter).subscribe(ret => {
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
        for (let i = 0; i < this.radios.length; i++) {
          this.radios[i].playing = false;
        }
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
    this._apiService.getTv(0, 4, this.cityFilter, this.ageFilter).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.tvs = $ret.data[0];
        this.tvsList = $ret.data;
        this.tvs.path = this.safeUrl(this.tvs.path + "?autoplay=0;autoplay=0&mute=1");
        this.isTvLoaded = true;
      } else {
        this.tvs = [];
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

  /* fetch code partners*/
  fetchKspPartners() {
    this._apiService.getKspPartners().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.partners = $ret.data;
        if (this.partners.length > 8) {
          this.partners = this.partners.slice(0, 8);
        }
      } else {
        this.partners = [];
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

  filterCity(cityList) {
    let cityNames = [];
    for (let i = 0; i < cityList.length; i++) {
      cityNames[i] = cityList[i].id;
    }
    this.cityFilter = cityNames;
    this.isLatestLoaded = false;
    this.isPopularLoaded = false;
    this.isTvLoaded = false;
    this.isRadioLoaded = false;
    this.updateLatestArticle();
    this.updateRecommendedArticle();
    // this.updateMostLovedArticle();
    this.updateRadio();
    this.updateTv();
  }

  filterAge(ageList) {
    let ageIds = [];
    for (let i = 0; i < ageList.length; i++) {
      ageIds[i] = ageList[i].id;
    }
    this.ageFilter = ageIds;
    this.isLatestLoaded = false;
    this.isPopularLoaded = false;
    this.isTvLoaded = false;
    this.isRadioLoaded = false;
    this.updateLatestArticle();
    this.updateRecommendedArticle();
    // this.updateMostLovedArticle();
    this.updateRadio();
    this.updateTv();
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
      this.todaySelected = !this.todaySelected;
    }
    else if (btn_id == 2) { /* 5: for indicating tomorrow button is clicked*/
      this.tomorrowSelected = !this.tomorrowSelected;
    }
    else if (btn_id == 3) { /* 5: for indicating saturday button is clicked*/
      this.saturdaySelected = !this.saturdaySelected;
    }
    else if (btn_id == 4) { /* 5: for indicating sunday button is clicked*/
      this.sundaySelected = !this.sundaySelected;
    }
    else { /* 5: for indicating pick a date button is clicked*/
      this.pickedDateSelected = !this.pickedDateSelected;
    }
    if (date) {
      date = new Date(date);
      let newDate = this._pipe.transform(date, 'yyyy-MM-dd');
      this.selectedDate = newDate;
      this.filterEvents();
    }
  }

  getEventsCitywise(city, id) {
    let checkedCities: any = [];
    let index = -1;
    for (let i = 0; i < this.cityList.length; i++) {
      if (i == id) {
        this.cityList[i].checked = !this.cityList[i].checked;
      }
      else {
        this.cityList[i].checked = false;
      }
      if (this.cityList[i].checked == true) {
        checkedCities[++index] = this.cityList[i].city;
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

  nextDate(dayIndex) {
    let date = new Date();
    date.setDate(date.getDate() + (dayIndex - 1 - date.getDay() + 7) % 7 + 1);
    return date;
  }

  onDateInput(e) {
    this.pickedDate = e.value;
    this.getEventsDatewise(this.pickedDate, 5); /* 5: for indicating pick a date button is clicked*/
  }

  showCategoryArticle(id) {
    if (this.tab_selected != id) {
      this.tab_selected = id;
      this.cat_id.length = 0;
      for (let i = 0; i < this.categoryList.length; i++) {
        if (this.categoryList[i].parent_id == id) {
          this.cat_id.push(this.categoryList[i].id);
        }
      }
      this._apiService.filterArticleCategory(this.cat_id, 1, 1, this.cat_id.length, this.cityFilter, this.ageFilter).subscribe(ret => {
        let $ret = ret.ret;
        if ($ret.code == 1) {
          this.categoryArticle = $ret.data.category.filter(cat => cat.type == 0);
          //console.log(this.categoryArticle);
        } else {
          this.categoryArticle = [];
        }
      }, err => {
      });
    }
  }

  setRadio(url, id, loop_index) {
    for (let i = 0; i < this.radios.length; i++) {
      if (i == loop_index) {
        this.radios[loop_index].playing = !this.radios[loop_index].playing;
      }
      else {
        this.radios[i].playing = false;
      }
    }
    scObj.load(url, id);
  }

  public myfunc(event: Event) {
    // carouselLoad will trigger this funnction when your load value reaches
    // it is helps to load the data by parts to increase the performance of the app
    // must use feature to all carousel
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

  bannerClickIntentCaptureShowPopup(banner, path, entity_id?) {
    this._apiService.bannerClickIntent(path, 'click', entity_id).subscribe(ret => {
    });
    this.subscribeThanaks = banner.popup_text;
    $('#thanksSubscribe').modal('show');
  }
}


@Component({
  selector: 'dialog-messages',
  templateUrl: './dialog-messages.html',
})
export class GroupJoinDialogMobile {
  constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}
