import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';
import { NgxCarousel } from 'ngx-carousel';
declare var tourObj: any;
declare var $: any;
@Component({
  selector: 'app-web-categorywise-article',
  templateUrl: './web-categorywise-article.component.html',
  styleUrls: ['./web-categorywise-article.component.css']
})
export class WebCategorywiseArticleComponent implements OnInit {
  public carouselOne: NgxCarousel;
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

  masterCategoryList: any;
  categoryList: any;
  tab_selected: any;
  bannerArticle: any = [];
  bannerPath: any;
  email: any;
  validemail: any = 0;
  subscribeThanaks: any;

  constructor(
    public _apiService: ApiService,
    public _commonService: CommonService,
    public _route: ActivatedRoute,
    public _router: Router
  ) {
    this.noOfItems = 12;
    this.noOfPaginations = 9;
    this.loading = true;
  }

  ngOnInit() {
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
    this._route
      .params
      .subscribe(params => {
        this.id = params['id'] || 0;

        this._apiService.getMasterCategories().subscribe(ret => {
          let $ret = ret.ret;
          if ($ret.code == 1) {
            this.masterCategoryList = $ret.data.master_categories.filter(cat => cat.type == 0);
            this.categoryList = $ret.data.sub_categories;
            for (let i = 0; i < this.masterCategoryList.length; i++) {
              this.masterCategoryList[i].checked = false;
            }
            for (let i = 0; i < this.categoryList.length; i++) {
              if (this.id == this.categoryList[i].id) {
                this.categoryList[i].checked = true;
                this.tab_selected = this.categoryList[i].parent_id;
              }
              else {
                this.categoryList[i].checked = false;
              }
            }
            // this.totalCount = this.categoryList.length;
            // this.isPrevious = false;
            // this.isNext = true;
            // this.currentPage = 1;
            // if(Math.ceil(this.totalCount/this.noOfItems)<=this.noOfPaginations){
            //   this.noOfPaginations = Math.ceil(this.totalCount/this.noOfItems);
            // }
            // this.paginations.length = 0;
            // for(let i=1; i<=this.noOfPaginations; i++){
            //   this.paginations[i-1] = i;
            // }
          } else {
            this.masterCategoryList = [];
            this.categoryList = [];
          }
        }, err => {
        });
        this._apiService.getBannerAgainstCategory({id: this.id}).subscribe(ret => {

          const $ret = ret.ret;
          if ($ret.code == 1) {
        this.bannerArticle = $ret.data;
        console.log(this.bannerArticle);
          } else {

          }
    }, err => {
    });
    /* Get Banners */
        this.loading = true;
        this._apiService.getOneCategoryArticles(this.id, 1, this.noOfItems).subscribe(ret => {
          let $ret = ret.ret;
          if ($ret.code == 1) {
            this.categoryName = $ret.data.category[0].category_name;
            this.categoryIcon = $ret.data.category[0].icon;
            this.articles = $ret.data.articles;
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
          this.loading = false;
        }, err => {
        });
      });
      // alert('hello');
  }

  getNewPage(pageNo) {
    if (pageNo < 1) {
      this.isPrevious = false;
    }
    else if (pageNo > Math.ceil(this.totalCount / this.noOfItems)) {
      this.isNext = false;
    }
    else {
      this.currentPage = pageNo;
      this.isPrevious = true;
      if (pageNo == 1) {
        this.isPrevious = false;
      }
      if (pageNo == Math.ceil(this.totalCount / this.noOfItems)) {
        this.isNext = false;
      }
      else {
        this.isNext = true;
      }
      if (pageNo >= this.noOfPaginations) {
        for (let i = 1; i <= this.noOfPaginations; i++) {
          this.paginations[i - 1] = pageNo - this.noOfPaginations + i;
        }
      }
      this.loading = true;
      this._apiService.getOneCategoryArticles(this.id, pageNo, this.noOfItems).subscribe(ret => {
        let $ret = ret.ret;
        if ($ret.code == 1) {
          this.articles = $ret.data.articles;
        }
        this.loading = false;
      }, err => {
      });
    }
  }
  submit() {
    this.validemail = 0;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(this.email);
    if (re.test(this.email)) {
      this._apiService.subscribeNewsletter(this.email, this.bannerArticle[0].type).subscribe(ret => {
        let $ret = ret.status;
        if ($ret == "Email id is already subscribed") {
          this.subscribeThanaks = 'Email id is already subscribed.';
          $('#thanksSubscribe').modal('show');
        } else {
          this.subscribeThanaks = 'Thank you for subscribing.';
          $('#thanksSubscribe').modal('show');
        }

      }, err => {
      });
    } else {
      this.validemail = 1;
    }
  }
}
