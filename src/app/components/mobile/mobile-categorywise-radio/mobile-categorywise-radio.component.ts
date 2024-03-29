import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

declare var scObj:any;

@Component({
  selector: 'app-mobile-categorywise-radio',
  templateUrl: './mobile-categorywise-radio.component.html',
  styleUrls: ['./mobile-categorywise-radio.component.css']
})
export class MobileCategorywiseRadioComponent implements OnInit {

  id:number;
  sub:any;
  articles:any;
  categoryName:string;
  categoryIcon:string;
  paginations:number[] = [];
  totalCount:number;
  isPrevious:boolean;
  isNext:boolean;
  currentPage:number;
  noOfItems:number;
  noOfPaginations:number;

  masterCategoryList:any;
  categoryList:any;
  tab_selected:any;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _route: ActivatedRoute,
    public _router:Router,
    public _sanitizer: DomSanitizer
  ) {
    this.noOfItems = 12;
    this.noOfPaginations = 5;
  }

  ngOnInit() {
    this._route
      .params
      .subscribe(params => {
        this.id = params['id'] || 0;

        this._apiService.getMasterCategories().subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.masterCategoryList = $ret.data.master_categories.filter(cat => cat.type == 2);
            this.categoryList = $ret.data.sub_categories;
            for(let i=0; i<this.masterCategoryList.length; i++){
              this.masterCategoryList[i].checked = false;
              this.tab_selected = this.masterCategoryList[i].id;
            }
            for(let i=0; i<this.categoryList.length; i++){
              if(this.id == this.categoryList[i].id){
                this.categoryList[i].checked = true;
                this.tab_selected = this.categoryList[i].parent_id;
              }
              else{
                this.categoryList[i].checked = false;
              }
            }
          }else{
            this.masterCategoryList = [];
            this.categoryList = [];
          }
        },err=>{
        });

        this._apiService.getOneCategoryRadios(this.id,1,this.noOfItems).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.categoryName = $ret.data.category[0].category_name;
            this.categoryIcon = $ret.data.category[0].icon;
            for(let i=0; i<$ret.data.articles.length; i++){
              $ret.data.articles[i].playing = false;
              // $ret.data.articles[i].img[0].path = this.safeUrl($ret.data.articles[i].img[0].path);
            }
            this.articles = $ret.data.articles;
            this.totalCount = $ret.data.category[0].totalArticles;
            this.isPrevious = false;
            this.isNext = true;
            this.currentPage = 1;
            this.noOfPaginations = 5;
            this.paginations = [];
            if(Math.ceil(this.totalCount/this.noOfItems)<=this.noOfPaginations){
              this.noOfPaginations = Math.ceil(this.totalCount/this.noOfItems);
            }
            for(let i=1; i<=this.noOfPaginations; i++){
              this.paginations[i-1] = i;
            }
          }
        },err=>{
        });
      });
  }

  getNewPage(pageNo){
    if(pageNo<1){
      this.isPrevious = false;
    }
    else if(pageNo>Math.ceil(this.totalCount/this.noOfItems)){
        this.isNext = false;
    }
    else{
      this.currentPage = pageNo;
      this.isPrevious = true;
      if(pageNo==1){
        this.isPrevious = false;
      }
      if(pageNo==Math.ceil(this.totalCount/this.noOfItems)){
        this.isNext = false;
      }
      else{
        this.isNext = true;
      }
      if(pageNo>=this.noOfPaginations){
        for(let i=1; i<=this.noOfPaginations; i++){
          this.paginations[i-1] = pageNo-this.noOfPaginations+i;
        }
      }
      this._apiService.getOneCategoryRadios(this.id,pageNo,this.noOfItems).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          for(let i=0; i<$ret.data.articles.length; i++){
            $ret.data.articles[i].playing = false;
            // $ret.data.articles[i].img[0].path = this.safeUrl($ret.data.articles[i].img[0].path);
          }
          this.articles = $ret.data.articles;
        }
      },err=>{
      });
    }
  }

  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  setRadio(url,id,loop_index){
    console.log(loop_index,url,id);
    for(let i=0; i<this.articles.length; i++){
      if(i==loop_index){
       this.articles[loop_index].playing = !this.articles[loop_index].playing;
      }
      else{
       this.articles[i].playing = false;
      }
    }
    scObj.load(url,id);
  }

}
