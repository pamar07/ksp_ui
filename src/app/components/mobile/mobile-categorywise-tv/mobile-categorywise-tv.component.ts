import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-mobile-categorywise-tv',
  templateUrl: './mobile-categorywise-tv.component.html',
  styleUrls: ['./mobile-categorywise-tv.component.css']
})
export class MobileCategorywiseTvComponent implements OnInit {

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

  loading:boolean;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _route: ActivatedRoute,
    public _router:Router
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

        this._apiService.getMasterCategories().subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.masterCategoryList = $ret.data.master_categories.filter(cat => cat.type == 1);
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
        this.loading = true;
        this._apiService.getOneCategoryTvs(this.id,1,this.noOfItems).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.categoryName = $ret.data.category[0].category_name;
            this.categoryIcon = $ret.data.category[0].icon;
            this.articles = $ret.data.articles;
            this.totalCount = $ret.data.category[0].totalArticles;
            this.isPrevious = false;
            this.isNext = true;
            this.currentPage = 1;
            this.noOfPaginations = 9;
            this.paginations = [];
            if(Math.ceil(this.totalCount/this.noOfItems)<=this.noOfPaginations){
              this.noOfPaginations = Math.ceil(this.totalCount/this.noOfItems);
            }
            for(let i=1; i<=this.noOfPaginations; i++){
              this.paginations[i-1] = i;
            }
            this.loading = false;
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
      this.loading = true;
      this._apiService.getOneCategoryTvs(this.id,pageNo,this.noOfItems).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.articles = $ret.data.articles;
        }
        this.loading = false;
      },err=>{
      });
    }
  }

}
