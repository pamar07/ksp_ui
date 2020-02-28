import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-mobile-authorwise-posts',
  templateUrl: './mobile-authorwise-posts.component.html',
  styleUrls: ['./mobile-authorwise-posts.component.css']
})
export class MobileAuthorwisePostsComponent implements OnInit {

  id:number;
  articles:any;
  author:any;

  paginations:number[] = [];
  totalCount:number;
  isPrevious:boolean;
  isNext:boolean;
  currentPage:number;
  noOfItems:number;
  noOfPaginations:number;

  promotions:any;
  loading:boolean;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _sanitizer: DomSanitizer,
    public _router:Router,
    public _route: ActivatedRoute
  ) {
    this.articles = [];
    this.noOfItems = 12;
    this.noOfPaginations = 5;
    this.loading = true;
  }

  ngOnInit() {
    this._route
      .params
      .subscribe(params => {
        this.id = params['id'] || 0;
        this.loading = true;
        this._apiService.getAuthorwisePosts(this.id, 1, 12).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.author = $ret.data;
            this.articles = $ret.data.articles;
            this.totalCount = $ret.data.articleCount;
            try{
              this.author.about_yourself = this.author.about_yourself.split("<a ").join("<a style='color:#e45b80;!important;'");
            }
            catch(e){}
            this.author.about_yourself = this.safeHtml(this.author.about_yourself);
            this.isPrevious = false;
            this.isNext = true;
            this.currentPage = 1;
            if(Math.ceil(this.totalCount/this.noOfItems)<=this.noOfPaginations){
              this.noOfPaginations = Math.ceil(this.totalCount/this.noOfItems);
            }
            for(let i=1; i<=this.noOfPaginations; i++){
              this.paginations[i-1] = i;
            }
          }
          this.loading = false;
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
      this._apiService.getAuthorwisePosts(this.id,pageNo,this.noOfItems).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.articles = $ret.data.articles;
        }
        this.loading = false;
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
  }

  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

}
