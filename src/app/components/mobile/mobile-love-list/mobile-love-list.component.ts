import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';


import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-mobile-love-list',
  templateUrl: './mobile-love-list.component.html',
  styleUrls: ['./mobile-love-list.component.css'],
  providers: [DatePipe]
})
export class MobileLoveListComponent implements OnInit {

  articles:any;
  tvs:any;
  radios:any;
  social_posts:any;
  events:any;
  camps:any;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _sanitizer: DomSanitizer,
    public _pipe: DatePipe,
  ) {
    this.articles = [];
    this.tvs = [];
    this.radios = [];
    this.social_posts = [];
  }

  ngOnInit() {
    this.updateArticleList();
    this.updateTvList();
    this.updateRadioList();
    this.updateSocialPostList();
    this.updateEventList();
    this.updateCampList();
  }

  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  updateArticleList(){
    this._apiService.getLoveList(1).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.articles = $ret.data;
      }
    },err=>{
    });
  }

  updateTvList(){
    this._apiService.getLoveList(2).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.tvs = $ret.data;
      }
    },err=>{
    });
  }

  updateRadioList(){
    this._apiService.getLoveList(3).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.radios = $ret.data;
        for(let i=0; i<this.radios.length; i++){
          this.radios[i].path = this.safeUrl(this.radios[i].path);
        }
      }
    },err=>{
    });
  }

  updateSocialPostList(){
    this._apiService.getLoveList(4).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.social_posts = $ret.data;
      }
    },err=>{
    });
  }

  updateEventList(){
    this._apiService.getLoveList(5).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.events = $ret.data;
      }
    },err=>{
    });
  }

  updateCampList(){
    this._apiService.getLoveList(6).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.camps = $ret.data;
      }
    },err=>{
    });
  }

  getOnlyDate(date){
    let newDate;
    if(date!=null){
      newDate = date.split(' ').join('T')+'+05:30';
      newDate = new Date(newDate);
    }
    else{
      newDate = new Date();
    }
    return this._pipe.transform(new Date(newDate), 'yyyy-MM-dd');
  }
}
