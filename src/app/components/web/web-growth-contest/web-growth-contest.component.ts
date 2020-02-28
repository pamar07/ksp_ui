import { Component, OnInit, Input , Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog, MD_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { NgxCarousel } from 'ngx-carousel';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

declare var tourObj: any;
declare var $: any;

@Component({
  selector: 'app-web-growth-contest',
  templateUrl: './web-growth-contest.component.html',
  styleUrls: ['./web-growth-contest.component.css'],
  providers: [DatePipe]
})
export class WebGrowthContestComponent implements OnInit {
  @Input() articleList: any;
  @Input() carauselId: any;

  public carouselOne: NgxCarousel;
  mealForm: FormGroup;
  bookForm: FormGroup;

  allPageBanners: any;
  bannerArticle: any;
  bannerPath: any;
  user: any;
  articles: any;
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
  pageCatId: any;
  cityFilter: any;
  ageFilter: any;
  pageData: any;
  myimg: any;
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
  isPrevious: boolean;
  isNext: boolean;
  showChangeParentalPrompt: boolean = false;
  forceCloseParentalPrompt: boolean = false;
  id: number;
  subscribeThanaks: any;
  pdfs: any = [];
  cityNameFilter: any = [];
  codeEvents: any = [];
  partners: any = [];
  categoryName: string;
  categoryIcon: string;
  paginations: number[] = [];
  totalCount: number;
  cityForm: FormGroup;
  appForm: FormGroup;
  mobPattern = new RegExp(/^[1-9][0-9]{4,12}$/);
  currentPage: number;
  noOfItems: number;
  noOfPaginations: number;
  categoryList: any;
  tab_selected: any;
  masterCategoryList: any;
  latesArticles: any;
  isLatesLoaded: boolean = false;
  boxArray = [];
  private itemArray: any[][];
  itemsrc: any;
  src: any;
  answer: any;
  answerReview: any;
  validAnswer: any = 0;
  content: any;
  view1: any = 1 ;
  view2: any ;
  devicewidth: any;
  img: any;
  showImage: any;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  seo: any;


  carouselOptions = {
    nav: false,
    navText: ["<div style='color: #fff;position: absolute;bottom: 56%;left: 0;background: rgba(243, 240, 240, 0.71);border:1px solid #000;padding: 17px 26px;font-size: 23px;' class='nav-btn prev-slide'><i class='fa fa-chevron-left' aria-hidden='true'></i></div>",
      "<div style='color: #fff;position: absolute;bottom: 56%;right: 0;background: rgba(243, 240, 240, 0.71);border:1px solid #000;padding: 17px 26px;font-size: 23px;' class='nav-btn next-slide'><i class='fa fa-chevron-right' aria-hidden='true'></i></div>"],
    items: 3,
    loop: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
  };
  constructor(
    public _apiService: ApiService,
    public _commonService: CommonService,
    public dialog: MdDialog,
    public _sanitizer: DomSanitizer,
    public _pipe: DatePipe,
    private form: FormBuilder,
    public _route: ActivatedRoute,
    public _router: Router,
    public seoTitle: Title,
    public meta: Meta,
  ) {
    this.selectedDate = '';
    this.selectedCity = [];
    this.today = new Date();
    this.allPageBanners = [];
    this.noOfItems = 12;
    this.noOfPaginations = 9;
    // this.seo = this._route.snapshot.data.seo.ret.code == 1 ? this._route.snapshot.data.seo.ret.data : {};
    // console.log(this.seo);
    this.seoTitle.setTitle('Right nutrition to promote growth in Indian kids');
    this.meta.updateTag({ property: 'og:title', content: 'Right nutrition to promote growth in Indian kids' });
    this.meta.updateTag({ property: 'og:image:alt', content: 'Right nutrition to promote growth in Indian kids' });
    this.meta.updateTag({ property: 'og:url', content: 'https://www.kidsstoppress.com/grow-right' });
    this.meta.updateTag({ property: 'og:type', content: 'growth' });
    this.meta.updateTag({ name: 'description', content: 'The right nutrition goes a long way in charting the course for a child’s mental & physical development. A balance of the right nutrition, play, nurturing and behaviour is what they needed to #GrowRight' });
    this.meta.updateTag({ property: 'og:description', content: 'The right nutrition goes a long way in charting the course for a child’s mental & physical development. A balance of the right nutrition, play, nurturing and behaviour is what they needed to #GrowRight' });
    this.meta.updateTag({ property: 'og:image', content: 'https://www.kidsstoppress.com/assets/images/Pediasure%20.png' });
    this.meta.updateTag({ property: 'og:image:width', content: '300' });
    this.meta.updateTag({ property: 'og:image:height', content: '200' });
    // this.meta.updateTag({ property: 'og:updated_time', content: this.seo.updated_at });
    this.meta.updateTag({ name: 'twitter:title', content: 'Right nutrition to promote growth in Indian kids' });
    this.meta.updateTag({ name: 'twitter:url', content: 'https://www.kidsstoppress.com/grow-right' });
    this.meta.updateTag({ name: 'twitter:description', content: 'The right nutrition goes a long way in charting the course for a child’s mental & physical development. A balance of the right nutrition, play, nurturing and behaviour is what they needed to #GrowRight' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://www.kidsstoppress.com/assets/images/Pediasure%20.png' });
  }
  ngOnInit() {


    localStorage.removeItem('viewpool');
    this.img = ['../../../../assets/images/did you know_ (3).png', '../../../../assets/images/did you know_ (4).png'];
    function imgRandom(imgArr) {
       return imgArr[Math.floor(Math.random() * imgArr.length)];
   }
this.showImage = imgRandom(this.img);
console.log(this.showImage);
   setInterval(() => {
    this.showImage = imgRandom(this.img);
    if (localStorage.getItem('viewpool')) {
      imgRandom(this.img);
   } else {
   }
  }, 50000);
  setInterval(() => {
    if (localStorage.getItem('viewpool')) {
       localStorage.removeItem('viewpool');
       imgRandom(this.img);
   } else {
   }
  }, 5000 * 10 * 60);
    $(document).scrollTop({scrollTop: '0px'}, 300);
    $(document).on('scroll', function() {
      if ($('#theTarget').position().top) {
        if ($(this).scrollTop() >= $('#theTarget').position().top) {
          localStorage.setItem('viewpool', '1');
        }
      }
  });
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
    };
    this.devicewidth = window.innerWidth;
    this._route
      .params
      .subscribe(params => {
        this.id = params['id'] || '70';
        this._apiService.getPageGrowth('1').subscribe(ret => {
          let $ret = ret.ret;
          if ($ret.code == 0) {
            this.pageData = $ret.data[0];
            console.log(this.pageData);
            this.myimg = this.pageData.banner_image;
            this.pageCatId = this.pageData.category_id;
            this.content = this._sanitizer.bypassSecurityTrustHtml(this.pageData.content);
      /* Seo Title and Meta data starts */
      this.seoTitle.setTitle('Right nutrition to promote growth in Indian kids');
      this.meta.updateTag({ property: 'og:title', content: 'Right nutrition to promote growth in Indian kids' });
      this.meta.updateTag({ property: 'og:image:alt', content: 'Right nutrition to promote growth in Indian kids' });
      this.meta.updateTag({ property: 'og:url', content: 'https://www.kidsstoppress.com/grow-right' });
      this.meta.updateTag({ property: 'og:type', content: 'growth' });
      this.meta.updateTag({ name: 'description', content: 'The right nutrition goes a long way in charting the course for a child’s mental & physical development. A balance of the right nutrition, play, nurturing and behaviour is what they needed to #GrowRight' });
      this.meta.updateTag({ property: 'og:description', content: 'The right nutrition goes a long way in charting the course for a child’s mental & physical development. A balance of the right nutrition, play, nurturing and behaviour is what they needed to #GrowRight' });
      this.meta.updateTag({ property: 'og:image', content: 'https://www.kidsstoppress.com/assets/images/Pediasure%20.png' });
      this.meta.updateTag({ property: 'og:image:width', content: '300' });
      this.meta.updateTag({ property: 'og:image:height', content: '200' });
      // this.meta.updateTag({ property: 'og:updated_time', content: this.seo.updated_at });
      this.meta.updateTag({ name: 'twitter:title', content: 'Right nutrition to promote growth in Indian kids' });
      this.meta.updateTag({ name: 'twitter:url', content: 'https://www.kidsstoppress.com/grow-right' });
      this.meta.updateTag({ name: 'twitter:description', content: 'The right nutrition goes a long way in charting the course for a child’s mental & physical development. A balance of the right nutrition, play, nurturing and behaviour is what they needed to #GrowRight' });
      this.meta.updateTag({ name: 'twitter:image', content: 'https://www.kidsstoppress.com/assets/images/Pediasure%20.png' });
            this._apiService.getOneCategoryArticles(this.pageCatId, 1, this.noOfItems).subscribe(ret => {
              let $ret = ret.ret;
              if ($ret.code == 1) {
                this.categoryName = $ret.data.category[0].category_name;
                this.categoryIcon = $ret.data.category[0].icon;
                this.articles = $ret.data.articles;
                console.log(this.articles);
                this.totalCount = $ret.data.category[0].totalArticles;
                this.isPrevious = false;
                this.isNext = true;
                this.currentPage = 1;
                this.noOfPaginations = 9;
                this.paginations = [];
                if (Math.ceil(this.totalCount / this.noOfItems) <= this.noOfPaginations) {
                  this.noOfPaginations = Math.ceil(this.totalCount / this.noOfItems);
                }
                for (let i = 1; i <= this.noOfPaginations; i++) {
                  this.paginations[i - 1] = i;
                }
              }
            }, err => {
            });
          }
        });
      });


    this._apiService.getBannerArticle(5, 1).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.bannerArticle = $ret.data;
        console.log(this.bannerArticle);

        this.bannerArticle = this.bannerArticle.filter(item => (!item.city || (item.city && (item.city.indexOf('National') !== -1 ||
          item.city == '' || item.city.indexOf(this._apiService.getAuthUser().city) !== -1))));

        this.bannerArticle = this.bannerArticle.filter(item => (!item.age_group || (item.age_group && (item.age_group == '' ||
          item.age_group.indexOf(this._apiService.getAuthUser().family_status) !== -1))));

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
    this._apiService.intentCaptureCommon('', 'growth', 'view', 'https://pediasure.com/').subscribe(ret => {
      console.log(ret);
    }, err => {
    });
  }

  filterCity(cityList) {
    const cityNames = [];
    const filtercity = [];
    for (let i = 0; i < cityList.length; i++) {
      cityNames[i] = cityList[i].id;
      filtercity[i] = cityList[i].city;
    }
    this.cityFilter = cityNames;
    this.cityNameFilter = filtercity;
    // this.isLatestLoaded = false;
    this.isPopularLoaded = false;
    this.isTvLoaded = false;
    this.isRadioLoaded = false;
  }
  gotoPedia() {
    this._apiService.intentCaptureCommon('', 'growth', 'click', 'https://amzn.to/2N0J5xj').subscribe(ret => {
      console.log(ret);
    }, err => {
    });
    window.open('https://amzn.to/2N0J5xj', '_blank');
  }
  gotoPediaTop() {
    this._apiService.intentCaptureCommon
    ('', 'growth', 'click', 'https://pediasure.in/child-nutrition/importance-of-measuring-and-monitoring-child-growth')
    .subscribe(ret => {
      console.log(ret);
    }, err => {
    });
    window.open('https://pediasure.in/child-nutrition/importance-of-measuring-and-monitoring-child-growth', '_blank');
  }
  gotomyarticle() {
    this._apiService.intentCaptureCommon('', 'growth', 'click', 'https://www.kidsstoppress.com/article-individual/17898').subscribe(ret => {
      console.log(ret);
    }, err => {
    });
    window.open('https://www.kidsstoppress.com/article-individual/17898', '_blank');
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
  polesSubmit() {
    this.validAnswer = 0;
    if (this.answer) {
      if (this.answer == 'option2') {
        this.answerReview = 'correct';
        this._apiService.intentCaptureCommon('', 'growth-answer', 'click',
         'correct').subscribe(ret => {
          console.log(ret);
        }, err => {
        });
      } else {
        this.answerReview = 'wrong';
        this._apiService.intentCaptureCommon('', 'growth-answer', 'click',
        'wrong').subscribe(ret => {
         console.log(ret);
       }, err => {
       });
      }
      $('#code-con').modal('show');
      $('.sub').css('background', '#a478be');
    } else {
      this.validAnswer = 1;
    }

  }
  onSelectionChange(value) {
    this.answer = value;
  }
  view(elem) {
    const docViewTop = $(window).scrollTop();
    const docViewBottom = docViewTop + $(window).height();
    const elemTop = $(elem).offset().top;
    const elemBottom = elemTop + $(elem).height();
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }
  swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT) {
    // out of range
    if (currentIndex > this.articles.length || currentIndex < 0) return;

    let nextIndex = 0;

    // swipe right, next avatar
    if (action === this.SWIPE_ACTION.RIGHT) {
        const isLast = currentIndex === this.articles.length - 1;
        nextIndex = isLast ? 0 : currentIndex + 1;
    }

    // swipe left, previous avatar
    if (action === this.SWIPE_ACTION.LEFT) {
        const isFirst = currentIndex === 0;
        nextIndex = isFirst ? this.articles.length - 1 : currentIndex - 1;
    }

    // toggle avatar visibility
    this.articles.forEach((x, i) => x.visible = (i === nextIndex));
}
}
