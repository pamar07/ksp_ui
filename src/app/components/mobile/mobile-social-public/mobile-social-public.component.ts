import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-mobile-social-public',
  templateUrl: './mobile-social-public.component.html',
  styleUrls: ['./mobile-social-public.component.css']
})
export class MobileSocialPublicComponent implements OnInit {

  allPageBanners:any;

  groups1:any;
  groups2:any;
  trendingGroups:any;

  promotions:any;

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
    this.groups1 = [];
    this.groups2 = [];
    this.noOfItems = 6;
    this.noOfPaginations = 9;
    this.allPageBanners = [];
  }

  ngOnInit() {
    if(this._apiService.loggedIn()){
      this._router.navigate(['/social-user']);
    }
    else{
      this._apiService.getAllGroupsPagewise(1,this.noOfItems).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          let allGroups = $ret.data.groups;
          if(allGroups.length>1){
            this.groups1 = allGroups.slice(0, allGroups.length/2);
            this.groups2 = allGroups.slice(allGroups.length/2, allGroups.length);
          }
          else{
            this.groups1 = allGroups;
          }
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
          this.groups1 = [];
          this.groups2 = [];
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

      this._apiService.getPromotionDetails().subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.promotions = $ret.data.innerAdds;
        }else{
          this.promotions = [];
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
          let allGroups = $ret.data.groups;
          if(allGroups.length>1){
            this.groups1 = allGroups.slice(0, allGroups.length/2);
            this.groups2 = allGroups.slice(allGroups.length/2, allGroups.length);
          }
          else{
            this.groups1 = allGroups;
          }
        }
      },err=>{
      });
    }
  }

}
