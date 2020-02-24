import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-web-social-public',
  templateUrl: './web-social-public.component.html',
  styleUrls: ['./web-social-public.component.css']
})
export class WebSocialPublicComponent implements OnInit {

  allPageBanners:any;
  groups:any;
  trendingGroups:any;

  paginations:number[] = [];
  totalCount:number;
  isPrevious:boolean;
  isNext:boolean;
  currentPage:number;
  noOfItems:number;
  noOfPaginations:number;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _router:Router,
    public _sanitizer: DomSanitizer
  ) {
    this.noOfItems = 6;
    this.noOfPaginations = 9;
    this.allPageBanners = [];
  }

  ngOnInit() {
    if(this._apiService.loggedIn()){
      this._router.navigate(['/social-user']);
    }
    else{
      this._apiService.getAllGroupsPagewise(1,4).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.groups = $ret.data.groups;
          this.totalCount = $ret.data.total_groups;
          this.isPrevious = false;
          this.isNext = true;
          this.currentPage = 1;
          if(Math.ceil(this.totalCount/this.noOfItems)<=this.noOfPaginations){
            this.noOfPaginations = Math.ceil(this.totalCount/this.noOfItems);
          }
          for(let i=1; i<=this.noOfPaginations; i++){
            this.paginations[i-1] = i;
          }
        }else{
          this.groups = [];
        }
      },err=>{
      });

      this._apiService.getMostLovedGroups(4).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.trendingGroups = $ret.data;
        }else{
          this.trendingGroups = [];
        }
      },err=>{
      });
      this._apiService.getAllPageBanners(this._commonService.noOfAllPageBanners).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.allPageBanners = $ret.data;
        }else{
          this.allPageBanners = [];
        }
      },err=>{
      });
    }
  }

  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
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
      this._apiService.getAllGroupsPagewise(pageNo,this.noOfItems).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.groups = $ret.data.groups;
        }
      },err=>{
      });
    }
  }

}
