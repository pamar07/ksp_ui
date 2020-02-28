import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxCarousel } from 'ngx-carousel';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

declare var $:any;

@Component({
  selector: 'app-web-ksp-code',
  templateUrl: './web-ksp-code.component.html',
  styleUrls: ['./web-ksp-code.component.css'],
  providers: [DatePipe]
})
export class WebKspCodeComponent implements OnInit {

  public carouselOne: NgxCarousel;
  codeForm: FormGroup;

  bannerImages:any;
  cityList:any;
  partners:any;
  codes:any;
  showAllPartners:boolean;
  showAllSavings:boolean;
  kspEvents:any;
  kspEventCarousel:any;
  setCurrentPartnerSelected:number;

  selectedCity:any;

  carousel_row:any;
  codeArticles:any = [];
  playPartners:any = [];
  tab_selected:any = '';
  categoryList:any = [];
  codePacks:any = [];
  activityPacks:any = [];
  mobPattern = new RegExp(/^[1-9][0-9]{4,12}$/);
  emailPattern = new RegExp(/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i);

  constructor(
    public _apiService:ApiService,
    public _router:Router,
    public _commonService:CommonService,
    public _sanitizer: DomSanitizer,
    public _pipe: DatePipe,
    private form:FormBuilder
  ) {
    this.showAllPartners = false;
    this.showAllSavings = false;
    this.selectedCity = 'All Cities';
    this.carousel_row = [];
    this.kspEventCarousel = [];
  }

  ngOnInit() {
    window.scrollTo(0,0);
    this.carouselOne = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
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
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngxcarouselPoint li.active {
              background: #ff3070;
              width: 15px;
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
    };
    this.bannerImages = [
      // {'path': 'assets/images/ksp-banner-9.png', link : '/ksp-code-activity'},
      {'path': 'assets/images/code-1.png', link : false},
      // {'path': 'assets/images/ksp-banner-8.png', link : '/ksp-code-activity'},
      {'path': 'assets/images/code2.png', link : false},
      {'path': 'assets/images/code3.png', link : false},
      // {'path': 'assets/images/ksp-banner-3.png', link : false}
    ];
    this._apiService.getKspPartners().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
          this.partners = $ret.data;
      } else{
        this.partners = [];
      }
    },err=>{
    });

    this._apiService.getCities().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.cityList = $ret.data;
      }
    },err=>{
    }); 

    this._apiService.getKspEvents(1,12).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.kspEvents = $ret.data;
        let no = Math.ceil((this.kspEvents.length / 6) + 1);
        for(let i=0; i<no; i++){
          this.kspEventCarousel.push(i);
        }
      }else{
        this.kspEvents = [];
      }
    },err=>{
    });

    this._apiService.getKspCodeArticles().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.codeArticles = $ret.data
      }else{
        this.codeArticles = [];
      }
    },err=>{
    });

    this.categoryList = [
      {'slug' : 'activity_centre', 'name' : 'Activity centres'},
      {'slug' : 'play_area', 'name' : 'Play areas'},
      {'slug' : 'read_relax', 'name' : 'Read & Relax'},
      {'slug' : 'restaurants', 'name' : 'Restaurants'},
      {'slug' : 'shopping', 'name' : 'Shopping'},
      {'slug' : 'sports_academy', 'name' : 'Sports academies'},
      {'slug' : 'toys_games', 'name' : 'Toys & Games'}
    ];
    this.tab_selected = 'activity_centre';

    this.playPartners = [
      {title: 'KidZania Mumbai , Ghatkopar' , tag_line: 'Buy 1 Kid Ticket, Get 1 Adult Ticket Free', img_path:'assets/images/partner/kidzania.jpg'},
      {title: 'Smaaash Junior, Lower Parel' , tag_line: 'Buy 1, Get 1 hr free (weekdays)', img_path:'assets/images/partner/smaash.png'},
      {title: 'RUSH Indoor Play Zone, Colaba' , tag_line: 'Buy 1, Get 1 hr free', img_path:'assets/images/partner/rush_Logo.jpg'},
      {title: 'Funshalla, Byculla', tag_line: 'Buy 1, Get 30 mins free', img_path:'assets/images/partner/funshala.jpg'},
      {title: 'Make N Bake, Charni Road', tag_line: 'Buy 1, Get 1 hr free', img_path:'assets/images/partner/make_n_bake.jpg'},
      {title: 'Jungle Play, Worli' , tag_line: 'Buy 1, Get 1 hr free', img_path:'assets/images/partner/jungle_play.jpg'},
      {title: 'Kiddington, Kandivali' , tag_line: 'Buy 1, Get 1 hr free ', img_path:'assets/images/partner/kiddington-logo-png.png'},
    ];

    this.codeForm = this.form.group({
      'email': [null, [Validators.required, Validators.pattern(this.emailPattern)]],
      'mobile': [null, [Validators.required, Validators.pattern(this.mobPattern)]],
      'city': ['',[]],
      'cityOther': [null, []],
    });
    let calledFromPopup = localStorage.getItem('codePopup');
    if(!calledFromPopup){
      setTimeout(function(){
        $('#code-con').modal('show');
      }, 3000);  
    } else {
      let flag:any = 0;
      localStorage.removeItem('codePopup');
    }

    /* Get Ksp Code packages */
    // this._apiService.codePacks().subscribe(ret=>{
    //   let $ret = ret.ret;
    //   if($ret.code == 1){
    //     let packs = $ret.data;
    //     this.codePacks = packs.filter(item=> (item.type == 0));
    //     this.activityPacks = packs.filter(item=> (item.type != 0));
    //     console.log(this.codePacks, this.activityPacks);
    //   }
    // });

    this._apiService.intentCaptureCommon('', 'ksp-code', 'view', '').subscribe(ret => {
      console.log(ret);
    }, err => {
    });

  }

  checkEmailOrPhone(type) {
    if(type == 'email') {
      if(this.codeForm.controls.email.value &&  this.codeForm.controls.email.value != '') {
        this.codeForm.get('mobile').setValidators([Validators.pattern(this.mobPattern)]);
      } else {
        this.codeForm.get('mobile').setValidators([Validators.required]);
      }
      this.codeForm.controls.mobile.updateValueAndValidity();
    
    } else if(type == 'phone') {
      if(this.codeForm.controls.mobile.value &&  this.codeForm.controls.mobile.value != '') {
        this.codeForm.get('email').setValidators([Validators.pattern(this.emailPattern)]);
      } else {
        this.codeForm.get('email').setValidators([Validators.required, Validators.pattern(this.emailPattern)]);
      }
      this.codeForm.controls.email.updateValueAndValidity();
    }
  }

  submitCodePopup(data) {
    this._apiService.kspCodeContactRequest({email: data.email, mobile: data.mobile, city:data.city, cityOther:data.cityOther, type: 'ksp-code'}).subscribe(ret=>{
      $('#code-con').modal('hide');
    },
    err => {
    });
  }

  scrollToCard(){
    $('html, body').animate({
      scrollTop: $("#codeCard").offset().top
    }, 1000);
    }

    payLink(link) {
      this._apiService.intentCaptureCommon('', 'ksp-code', 'click', link).subscribe(ret => {
        console.log(ret);
      }, err => {
      });
      if (this._apiService.loggedIn()) {
      localStorage.setItem('kspcode','1');
    }else {
      this._router.navigate(["/login"]);
    }
    }
  

  safeStyle(style) {
    return this._sanitizer.bypassSecurityTrustStyle(style);
  }

  public myfunc(event: Event) { }
}
