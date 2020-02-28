import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';
declare var tourObj: any;
declare var $: any;
@Component({
  selector: 'app-mobile-categorywise-article',
  templateUrl: './mobile-categorywise-article.component.html',
  styleUrls: ['./mobile-categorywise-article.component.css']
})
export class MobileCategorywiseArticleComponent implements OnInit {


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
  validemail: any;
  subscribeThanaks: any;
  email: any;
  constructor(
    public _apiService: ApiService,
    public _commonService: CommonService,
    public _route: ActivatedRoute,
    public _router: Router
  ) {
    this.noOfItems = 12;
    this.noOfPaginations = 5;
    this.loading = true;
  }

  ngOnInit() {
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
