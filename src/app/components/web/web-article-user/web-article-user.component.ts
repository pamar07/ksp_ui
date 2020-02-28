import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxCarousel } from 'ngx-carousel';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

//declare var tabObj: any;

@Component({
  selector: 'app-web-article-user',
  templateUrl: './web-article-user.component.html',
  styleUrls: ['./web-article-user.component.css']
})
export class WebArticleUserComponent implements OnInit {

  public carouselOne: NgxCarousel;

  allPageBanners: any;
  bannerArticle: any;
  latestArticles: any;
  popularArticles: any;
  categorywiseArticle: any;
  loading: boolean;
  masterCategoryList: any;
  categoryList: any;
  categoryCount: number = 0;

  paginations: number[] = [];
  totalCount: number;
  isPrevious: boolean;
  isNext: boolean;
  currentPage: number;
  noOfItems: number;
  noOfPaginations: number;

  cityFilter: any;
  ageFilter: any;
  master_cat_id: any;
  cat_id: any;
  tab_selected: any;
  resType: any;


  constructor(
    public _apiService: ApiService,
    public _commonService: CommonService,
    public _sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.loading = true;
    this.cityFilter = [];
    this.ageFilter = [];
    this.cat_id = [];
    this.noOfItems = 10;
    this.noOfPaginations = 9;
    this.allPageBanners = [];
  }

  ngOnInit() {
    //tabObj.loadTab();
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
            left: 45%;
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
          .leftRs {
             position: absolute;
             margin: auto;
             top: 0;
             bottom: 0;
             width: 50px;
             height: 50px;
             /*box-shadow: 1px 2px 10px -1px rgba(0, 0, 0, .3);*/
             border-radius: 999px;
             left: 0;
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
             right: 0;
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
            console.log(this.categoryList);
            let masterId = 0;
            for (let i = 0; i < this.categoryList.length; i++) {
              if (mostRecentPost.category.length && (this.categoryList[i].id == mostRecentPost.category[0].category_id)) {
                masterId = this.categoryList[i].parent_id;
              }
            }
            for (let i = 0; i < this.masterCategoryList.length; i++) {
              this.masterCategoryList[i].checked = false;
              if (this.masterCategoryList[i].id == masterId) {
                this.tab_selected = this.masterCategoryList[i].id;
              }
            }
            for (let i = 0; i < this.categoryList.length; i++) {
              this.categoryList[i].checked = false;
            }
            this.checkMasterCategory(masterId);
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

    this.updateLatest();
    this.updateLoved();

    this._apiService.getAllPageBanners(this._commonService.noOfAllPageBanners).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.allPageBanners = $ret.data;
      } else {
        this.allPageBanners = [];
      }
    }, err => {
    });

    this.resType = {
      post: '/article-individual/',
      'ksp-radio': '/radio-individual/',
      event: '/event-individual',
      videos: '/tv-individual/'
    };
  }

  updateLatest() {
    this._apiService.getArticlesRecent(1, 5, this.cityFilter, this.ageFilter).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.latestArticles = $ret.data.recent;
      } else {
        this.latestArticles = [];
      }
    }, err => {
    });
  }

  updateLoved() {
    this._apiService.getArticlesMostLoved(1, 20).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.popularArticles = $ret.data.popular;
      } else {
        this.popularArticles = [];
      }
    }, err => {
    });
  }

  safeStyle(style) {
    return this._sanitizer.bypassSecurityTrustStyle(style);
  }

  setFilter(id) {
    /*this.filterList[id].checked = !this.filterList[id].checked;
    if(id == 0){
      this.isArticleShow = !this.isArticleShow;
    }
    else if(id ==1){
      this.isTvShow = !this.isTvShow;
    }
    else if(id == 2){
      this.isRadioShow = !this.isRadioShow;
    }
    else if(id == 3){
      this.isEventShow = !this.isEventShow;
    }*/
  }

  filterCity(cityList) {
    let cityNames = [];
    for (let i = 0; i < cityList.length; i++) {
      cityNames[i] = cityList[i].id;
    }
    this.cityFilter = cityNames;
    this.updateAllCategory();
    this.updateLatest();
    this.updateLoved();
  }

  filterAge(ageList) {
    let ageIds = [];
    for (let i = 0; i < ageList.length; i++) {
      ageIds[i] = ageList[i].id;
    }
    this.ageFilter = ageIds;
    this.updateAllCategory();
    this.updateLatest();
    this.updateLoved();
  }

  updateAllCategory() {
    this._apiService.getMasterCategories().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        let mostRecentPost: any;
        this._apiService.getArticlesRecent(1, 1).subscribe(ret1 => {
          let $ret1 = ret1.ret;
          if ($ret1.code == 1) {
            mostRecentPost = $ret1.data.recent[0];

            this.masterCategoryList = $ret.data.master_categories.filter(cat => cat.type == 0);
            this.categoryList = $ret.data.sub_categories;
            let masterId = 0;
            for (let i = 0; i < this.categoryList.length; i++) {
              if (mostRecentPost.category.length && (this.categoryList[i].id == mostRecentPost.category[0].category_id)) {
                masterId = this.categoryList[i].parent_id;
              }
            }
            for (let i = 0; i < this.masterCategoryList.length; i++) {
              this.masterCategoryList[i].checked = false;
              if (this.masterCategoryList[i].id == masterId) {
                this.tab_selected = this.masterCategoryList[i].id;
              }
            }
            for (let i = 0; i < this.categoryList.length; i++) {
              this.categoryList[i].checked = false;
            }
            this.checkMasterCategory(masterId);
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

  }

  stopPropagation(e) {
    e.stopPropagation();
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
      this._apiService.filterArticleCategory(this.cat_id, 9, pageNo, this.noOfItems, this.cityFilter, this.ageFilter).subscribe(ret => {
        let $ret = ret.ret;
        if ($ret.code == 1) {
          //this.categorywiseArticle = $ret.data.category.filter(cat => cat.type == 0);
          this.categorywiseArticle = this.sortCat($ret.data.category.filter(cat => cat.type == 0));
          this.categoryCount = Math.floor(this.categorywiseArticle.length / 2);
          this.loading = false;
        } else {
          this.categorywiseArticle = [];
          this.loading = false;
        }
      }, err => {
      });
    }
  }

  checkMasterCategory(id) {
    this.tab_selected = id;
    this.master_cat_id = [];
    this.cat_id = [];
    this.categorywiseArticle = [];
    for (let i = 0; i < this.masterCategoryList.length; i++) {
      if (this.masterCategoryList[i].id == id) {
        this.masterCategoryList[i].checked = true;
      }
      else {
        this.masterCategoryList[i].checked = false;
      }
      if (this.masterCategoryList[i].checked) {
        this.master_cat_id.push(this.masterCategoryList[i].id);
        for (let j = 0; j < this.categoryList.length; j++) {
          if (this.categoryList[j].parent_id == this.masterCategoryList[i].id) {
            this.categoryList[j].checked = true;
            this.cat_id.push(this.categoryList[j].id);
          }
        }
      }
    }
    if (this.cat_id.length != 0) {
      this.totalCount = this.cat_id.length;
    }
    else {
      this.totalCount = 10;
    }
    this.loading = true;
    this._apiService.filterArticleCategory(this.cat_id, 9, 1, this.noOfItems, this.cityFilter, this.ageFilter).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        //this.categorywiseArticle = $ret.data.category;
        this.categorywiseArticle = this.sortCat($ret.data.category.filter(cat => cat.type == 0));
        this.noOfPaginations = 9;
        if (Math.ceil(this.totalCount / this.categorywiseArticle.length) <= this.noOfPaginations) {
          this.noOfPaginations = Math.ceil(this.totalCount / this.categorywiseArticle.length);
        }
        this.paginations.length = 0;
        for (let i = 1; i <= this.noOfPaginations; i++) {
          this.paginations[i - 1] = i;
        }
        this.loading = false;
      } else {
        this.categorywiseArticle = [];
        this.loading = false;
      }
    }, err => {
    });
  }

  sortCat(unsortedCategory) {
    let sortedCategory = [];
    let firstArticles = [];
    let firstDates = [];
    let j = -1;
    for (let i = 0; i < unsortedCategory.length; i++) {
      if (unsortedCategory[i].article) {
        ++j;
        firstArticles[j] = unsortedCategory[i].article[0];
        var pub_date = new Date(firstArticles[j].published_date.split(' ').join('T'));
        var date_mili = pub_date.getTime();
        firstDates[j] = date_mili;
      }
    }
    firstDates.sort();
    firstDates.reverse();
    for (let i = 0; i < firstDates.length; i++) {
      for (let j = 0; j < unsortedCategory.length; j++) {
        if (unsortedCategory[j].article) {
          let tmp_article = unsortedCategory[j].article[0];
          var pub_date = new Date(tmp_article.published_date.split(' ').join('T'));
          var date_mili = pub_date.getTime();
          if (date_mili == firstDates[i]) {
            sortedCategory[i] = unsortedCategory[j];
          }
        }
      }
    }
    return sortedCategory;
  }

  checkSubCategory(id, masterId) {
    this.cat_id = [];
    this.categorywiseArticle = [];
    for (let i = 0; i < this.categoryList.length; i++) {
      if (this.categoryList[i].id == id) {
        this.categoryList[i].checked = !this.categoryList[i].checked;
      }
      if (this.categoryList[i].checked) {
        if (this.categoryList[i].parent_id == masterId) {
          this.cat_id.push(this.categoryList[i].id);
        }
        else {
          this.categoryList[i].checked = !this.categoryList[i].checked;
        }
      }
    }
    this.loading = true;
    if (this.cat_id.length != 0) {
      this.totalCount = this.cat_id.length;
    }
    else {
      this.totalCount = (this.categoryList.filter(cat => cat.type == 0)).length;
    }
    this._apiService.filterArticleCategory(this.cat_id, 9, 1, this.noOfItems, this.cityFilter, this.ageFilter).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.categorywiseArticle = $ret.data.category.filter(cat => cat.type == 0);
        this.noOfPaginations = 9;
        if (this.cat_id.length != 0) {
          if (Math.ceil(this.cat_id.length / this.noOfItems) <= this.noOfPaginations) {
            this.noOfPaginations = Math.ceil(this.cat_id.length / this.noOfItems);
          }
        }
        else {
          this.noOfPaginations = Math.ceil((this.categoryList.filter(cat => cat.type == 0)).length / this.noOfItems);
        }
        this.paginations.length = 0;
        for (let i = 1; i <= this.noOfPaginations; i++) {
          this.paginations[i - 1] = i;
        }
        this.loading = false;
      } else {
        this.categorywiseArticle = [];
        this.loading = false;
      }
    }, err => {
    });
  }

  public myfunc(event: Event) {
    // carouselLoad will trigger this funnction when your load value reaches
    // it is helps to load the data by parts to increase the performance of the app
    // must use feature to all carousel
  }
  goToCategories(cat) {
    console.log(cat);
    if (cat.type === 0) {
      this.router.navigateByUrl('/categorywise-article/' + cat.id);
    } else if (cat.type === 1) {
      this.router.navigateByUrl('/categorywise-tv/' + cat.id);
    } else if (cat.type === 2) {
      this.router.navigateByUrl('/categorywise-radio/' + cat.id);
    }
  }
}
