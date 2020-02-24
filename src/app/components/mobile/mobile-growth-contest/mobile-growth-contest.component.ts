
import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MD_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { NgxCarousel } from 'ngx-carousel';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';
import { Meta, Title } from '@angular/platform-browser';

declare var scObj: any;
declare var $: any;

@Component({
  selector: 'app-mobile-growth-contest',
  templateUrl: './mobile-growth-contest.component.html',
  styleUrls: ['./mobile-growth-contest.component.css'],
  providers: [DatePipe]
})
export class MobileGrowthContestComponent implements OnInit {

  public carouselOne: NgxCarousel;
  mealForm: FormGroup;
  bookForm: FormGroup;
  id: number;
  sub: any;
  articles: any;
  categoryName: string;
  categoryIcon: string;
  paginations: number[] = [];
  totalCount: number;
  isPrevious: boolean;
  isNext: boolean;
  currentPage: number;
  noOfItems: number;
  noOfPaginations: number;

  loading: boolean;
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
  pageData: any;
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
  answer: any;
  answerReview: any;
  validAnswer: any = 0;


  // magazine
  cityNameFilter: any;
  pdfs: any = [];
  // magazine

  subscribeThanaks: any;

  cityForm: FormGroup;
  pageCatId: any;
  latesArticles: any;
  isLatesLoaded: boolean = false;
  boxArray = [];
  private itemArray: any[][];
  itemsrc: any;
  src: any;
  myimg: any;
  content: any;
  view1: any = 1;
  view2: any;
  showImage: any;
  img: any;
  seo: any;
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
    this.noOfItems = 12;
    this.noOfPaginations = 5;
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
    setInterval(() => {
      if (localStorage.getItem('viewpool')) {
        this.view1 = 0;
        this.view2 = 1;
      } else {
      }
    }, 50000);
    setInterval(() => {
      if (localStorage.getItem('viewpool')) {
        localStorage.removeItem('viewpool');
        this.view1 = 1;
        this.view2 = 0;
      } else {
      }
    }, 5000 * 10 * 60);
    $(document).scrollTop({ scrollTop: '0px' }, 300);
    $(document).on('scroll', function () {
      if ($(this).scrollTop() >= $('#theTarget').position().top) {
        localStorage.setItem('viewpool', '1');
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
    this._route.params
      .subscribe(params => {
        this.id = params['id'] || 70;
        this._apiService.getPageGrowth('1').subscribe(ret => {
          let $ret = ret.ret;
          if ($ret.code == 0) {
            this.pageData = $ret.data[0];
            this.content = this._sanitizer.bypassSecurityTrustHtml(this.pageData.content);
            this.myimg = this.pageData.banner_image;
            this.pageCatId = this.pageData.category_id;
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
                this.noOfPaginations = 5;
                this.paginations = [];
                if (Math.ceil(this.totalCount / this.noOfItems) <= this.noOfPaginations) {
                  this.noOfPaginations = Math.ceil(this.totalCount / this.noOfItems);
                }
                for (let i = 1; i <= this.noOfPaginations; i++) {
                  this.paginations[i - 1] = i;
                }
              }
              this.loading = false;
            }, err => {
            });
          }
        });
      });

    this._apiService.getBannerArticle(5, 1).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.bannerArticle = $ret.data;
        this.bannerArticle = this.bannerArticle.filter(item => (!item.city || (item.city &&
          (item.city.indexOf('National') !== -1 || item.city == '' || item.city.indexOf(this._apiService.getAuthUser().city) !== -1))));

        this.bannerArticle = this.bannerArticle.filter(item => (!item.age_group || (item.age_group &&
          (item.age_group == '' || item.age_group.indexOf(this._apiService.getAuthUser().family_status) !== -1))));

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
    this._apiService.intentCaptureCommon('', 'growth', 'view', 'https://pediasure.com/').subscribe(ret => {
      console.log(ret);
    }, err => {
    });
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
}
