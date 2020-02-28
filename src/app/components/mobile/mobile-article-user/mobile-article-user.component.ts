import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxCarousel } from 'ngx-carousel';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

//declare var tabObj: any;

@Component({
  selector: 'app-mobile-article-user',
  templateUrl: './mobile-article-user.component.html',
  styleUrls: ['./mobile-article-user.component.css']
})
export class MobileArticleUserComponent implements OnInit {

  public carouselOne: NgxCarousel;

  allPageBanners:any;
  bannerArticle:any;
  popularArticles:any;
  categorywiseArticle:any;
  loading:boolean;
  masterCategoryList:any;
  categoryList:any;

  cityFilter:any;
  ageFilter:any;
  master_cat_id:any;
  cat_id:any;
  tab_selected:any;
  currentCategorySelected:any;

  promotions:any;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _router:Router,
    public _sanitizer: DomSanitizer
  ) {
    this.loading = true;
    this.cityFilter = [];
    this.ageFilter = [];
    this.masterCategoryList = [];
    this.cat_id = [];
    this.allPageBanners = [];
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
  this._apiService.getAllPageBanners(this._commonService.noOfAllPageBanners).subscribe(ret=>{
    let $ret = ret.ret;
    if($ret.code == 1){
      this.allPageBanners = $ret.data;
    }else{
      this.allPageBanners = [];
    }
  },err=>{
  });

  this._apiService.getArticlesRecent(1,5,this.cityFilter,this.ageFilter).subscribe(ret=>{
    let $ret = ret.ret;
    if($ret.code == 1){
      this.bannerArticle = $ret.data.recent;
    }else{
      this.bannerArticle = [];
    }
  },err=>{
  });

  this._apiService.getMasterCategories().subscribe(ret=>{
    let $ret = ret.ret;
    if($ret.code == 1){

      /*test*/
      let mostRecentPost:any;
      this._apiService.getArticlesRecent(1,1).subscribe(ret1=>{
        let $ret1 = ret1.ret;
        if($ret1.code == 1){
          mostRecentPost = $ret1.data.recent[0];

          this.masterCategoryList = $ret.data.master_categories.filter(cat => cat.type == 0);
          this.categoryList = $ret.data.sub_categories;
          let masterId = 0;
          for(let i=0; i<this.categoryList.length; i++){
            if(mostRecentPost.category.length && (this.categoryList[i].id == mostRecentPost.category[0].category_id)){
              masterId = this.categoryList[i].parent_id;
            }
          }
          for(let i=0; i<this.masterCategoryList.length; i++){
            this.masterCategoryList[i].checked = false;
            if(this.masterCategoryList[i].id == masterId){
              this.tab_selected = this.masterCategoryList[i].id;
            }
          }
          for(let i=0; i<this.categoryList.length; i++){
            this.categoryList[i].checked = false;
          }
        }else{
          mostRecentPost = [];
        }
      },err=>{
      });


      // this.masterCategoryList = $ret.data.master_categories.filter(cat => cat.type == 0);
      // this.categoryList = $ret.data.sub_categories;
      // for(let i=0; i<this.masterCategoryList.length; i++){
      //   this.masterCategoryList[i].checked = false;
      //   if(i==0){
      //     this.tab_selected = this.masterCategoryList[i].id;
      //   }
      // }
      // let firstSubCatList = this.categoryList.filter(item=> item.parent_id == this.tab_selected);
      // for(let i=0; i<this.categoryList.length; i++){
      //   this.categoryList[i].checked = false;
      //   if(this.categoryList[i].id==firstSubCatList[0].id){
      //     this.getOneCategoryArticles(firstSubCatList[0].id,i);
      //   }
      // }
    }else{
      this.masterCategoryList = [];
      this.categoryList = [];
    }
  },err=>{
  });

  this._apiService.getArticlesMostLoved(1,12).subscribe(ret=>{
    let $ret = ret.ret;
    if($ret.code == 1){
      this.popularArticles = $ret.data.popular;
    }else{
      this.popularArticles = [];
    }
  },err=>{
  });
}

  safeStyle(style) {
    return this._sanitizer.bypassSecurityTrustStyle(style);
  }

  getOneCategoryArticles(id,loop_index){
    this.loading = true;
    this.currentCategorySelected = this.categoryList[loop_index];
    for(let i=0; i<this.categoryList.length; i++){
      this.categoryList[i].checked = false;
    }
    this._apiService.getOneCategoryArticles(id,1,10).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.categorywiseArticle = $ret.data.articles;
        this.categoryList[loop_index].checked = true;
        this.loading = false;
      }
    },err=>{
    });
    this._apiService.getPromotionDetails().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.promotions = $ret.data.innerAdds;
      }else{
        this.promotions = [];
      }
    },err=>{
    });
  }

  updateLatest(){
    this._apiService.getArticlesRecent(1,5,this.cityFilter,this.ageFilter).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.bannerArticle = $ret.data.recent;
      }else{
        this.bannerArticle = [];
      }
    },err=>{
    });
  }

  updateAllCategory(){
    this._apiService.getMasterCategories().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        /*test*/
        let mostRecentPost:any;
        this._apiService.getArticlesRecent(1,1).subscribe(ret1=>{
          let $ret1 = ret1.ret;
          if($ret1.code == 1){
            mostRecentPost = $ret1.data.recent[0];

            this.masterCategoryList = $ret.data.master_categories.filter(cat => cat.type == 0);
            this.categoryList = $ret.data.sub_categories;
            let masterId = 0;
            for(let i=0; i<this.categoryList.length; i++){
              if(mostRecentPost.category.length && (this.categoryList[i].id == mostRecentPost.category[0].category_id)){
                masterId = this.categoryList[i].parent_id;
              }
            }
            for(let i=0; i<this.masterCategoryList.length; i++){
              this.masterCategoryList[i].checked = false;
              if(this.masterCategoryList[i].id == masterId){
                this.tab_selected = this.masterCategoryList[i].id;
              }
            }
            for(let i=0; i<this.categoryList.length; i++){
              this.categoryList[i].checked = false;
              if(this.categoryList[i].id==mostRecentPost.category[0].category_id){
                this.getOneCategoryArticles(mostRecentPost.category[0].category_id,i);
              }
            }
          }else{
            mostRecentPost = [];
          }
        },err=>{
        });

        // this.masterCategoryList = $ret.data.master_categories.filter(cat => cat.type == 0);
        // this.categoryList = $ret.data.sub_categories;
        // for(let i=0; i<this.masterCategoryList.length; i++){
        //   this.masterCategoryList[i].checked = false;
        //   if(i==0){
        //     this.tab_selected = this.masterCategoryList[i].id;
        //   }
        // }
        // let firstSubCatList = this.categoryList.filter(item=> item.parent_id == this.tab_selected);
        // for(let i=0; i<this.categoryList.length; i++){
        //   this.categoryList[i].checked = false;
        //   if(this.categoryList[i].id==firstSubCatList[0].id){
        //     this.getOneCategoryArticles(firstSubCatList[0].id,i);
        //   }
        // }
      }else{
        this.masterCategoryList = [];
        this.categoryList = [];
      }
    },err=>{
    });
  }

  updateLoved(){
    this._apiService.getArticlesMostLoved(1,12,this.cityFilter,this.ageFilter).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.popularArticles = $ret.data.popular;
      }else{
        this.popularArticles = [];
      }
    },err=>{
    });
  }

  filterCity(cityList){
    let cityNames = [];
    for(let i=0; i<cityList.length; i++){
      cityNames[i]=cityList[i].id;
    }
    this.cityFilter = cityNames;
    this.updateAllCategory();
    this.updateLatest();
    this.updateLoved();
  }

  filterAge(ageList){
    let ageIds = [];
    for(let i=0; i<ageList.length; i++){
      ageIds[i]=ageList[i].id;
    }
    this.ageFilter = ageIds;
    this.updateAllCategory();
    this.updateLatest();
    this.updateLoved();
  }

  public myfunc(event: Event) {

   }

}
