import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-mobile-tv-all',
  templateUrl: './mobile-tv-all.component.html',
  styleUrls: ['./mobile-tv-all.component.css']
})
export class MobileTvAllComponent implements OnInit {

  allPageBanners:any;
  id:number;
  sub:any;
  tvList1:any;
  tvList2:any;
  paginations:number[] = [];
  totalCount:number;
  isPrevious:boolean;
  isNext:boolean;
  currentPage:number;
  noOfItems:number;
  noOfPaginations:number;
  promotions:any;

  bannerTv:any;
  cityFilter:any;
  ageFilter:any;

  isTvLoaded:boolean = false;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _sanitizer: DomSanitizer,
    public _route: ActivatedRoute,
    public _router:Router
  ) {
    this.noOfItems = 15;
    this.noOfPaginations = 5;
    this.bannerTv = [];
    this.tvList1 = [];
    this.tvList2 = [];
    this.cityFilter = [];
    this.ageFilter = [];
    this.allPageBanners = [];
  }

  ngOnInit() {
    this._route
      .params
      .subscribe(params => {
        this.id = params['id'] || 0;
        this.updateTv();
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
      this.isTvLoaded = false;
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
      this._apiService.getTv(pageNo,this.noOfItems,this.cityFilter,this.ageFilter).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          if($ret.data.length>5){
            try{
              this.bannerTv = $ret.data.slice(0,5);
              this.tvList1 = $ret.data.slice(5,$ret.data.length-5);
              this.tvList2 = $ret.data.slice(10,$ret.data.length);
            }
            catch(e){}
            this.isTvLoaded = true;
          }
          else{
            this.bannerTv = [];
            try{
              this.tvList1 = $ret.data.slice(0,5);
              this.tvList2 = $ret.data.slice(5,$ret.data.length);
            }
            catch(e){}
          }
        }
      },err=>{
      });
      this._apiService.getPromotionDetails().subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.promotions = $ret.data;
          this.promotions = this.promotions.filter(item => item.type == 4);
          // console.log(this.promotions);
        }else{
          this.promotions = [];
        }
      },err=>{
      });
    }
  }

  safeStyle(style) {
    return this._sanitizer.bypassSecurityTrustStyle(style);
  }

  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  filterCity(cityList){
    let cityNames = [];
    for(let i=0; i<cityList.length; i++){
      cityNames[i]=cityList[i].id;
    }
    this.cityFilter = cityNames;
    this.isTvLoaded = false;
    this.updateTv();
  }

  filterAge(ageList){
    let ageIds = [];
    for(let i=0; i<ageList.length; i++){
      ageIds[i]=ageList[i].id;
    }
    this.ageFilter = ageIds;
    this.isTvLoaded = false;
    this.updateTv();
  }

  updateTv(){
    this.noOfPaginations = 5;
    this._apiService.getTv(1,this.noOfItems,this.cityFilter,this.ageFilter).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        if($ret.data.length>5){
          try{
            this.bannerTv = $ret.data.slice(0,5);
            this.tvList1 = $ret.data.slice(5,$ret.data.length-5);
            this.tvList2 = $ret.data.slice(10,$ret.data.length);
          }
          catch(e){}
          // console.log("bannerTv: ",this.bannerTv);
          // console.log("tvList1: ",this.tvList1);
          // console.log("tvList2: ",this.tvList2);
        }
        else{
          this.bannerTv = [];
          try{
            this.tvList1 = $ret.data.slice(0,5);
            this.tvList2 = $ret.data.slice(5,$ret.data.length);
          }
          catch(e){}
        }
        this.totalCount = $ret.tvCount;
        this.isPrevious = false;
        this.isNext = true;
        this.currentPage = 1;
        if(Math.ceil(this.totalCount/this.noOfItems)<=this.noOfPaginations){
          this.noOfPaginations = Math.ceil(this.totalCount/this.noOfItems);
        }
        this.paginations.length = 0;
        for(let i=1; i<=this.noOfPaginations; i++){
          this.paginations[i-1] = i;
        }
        this.isTvLoaded = true;
      }
    },err=>{
    });
  }

}
