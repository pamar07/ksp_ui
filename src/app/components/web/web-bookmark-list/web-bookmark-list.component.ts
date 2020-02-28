import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-web-bookmark-list',
  templateUrl: './web-bookmark-list.component.html',
  styleUrls: ['./web-bookmark-list.component.css']
})
export class WebBookmarkListComponent implements OnInit {

  articles:any;
  tvs:any;
  radios:any;
  social_posts:any;
  events:any;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _sanitizer: DomSanitizer
  ) {
    this.articles = [];
    this.tvs = [];
    this.radios = [];
    this.social_posts = [];
    this.events = [];
  }

  ngOnInit() {
    this.updateArticleList();
    this.updateTvList();
    this.updateRadioList();
    this.updateSocialPostList();
    this.updateEventList();
  }

  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  updateArticleList(){
    this._apiService.getBookmarkList(1).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.articles = $ret.data;
      }
    },err=>{
    });
  }

  updateTvList(){
    this._apiService.getBookmarkList(2).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.tvs = $ret.data;
      }
    },err=>{
    });
  }

  updateRadioList(){
    this._apiService.getBookmarkList(3).subscribe(ret=>{
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
    this._apiService.getBookmarkList(4).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.social_posts = $ret.data;
      }
    },err=>{
    });
  }

  updateEventList(){
    this._apiService.getBookmarkList(5).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.events = $ret.data;
      }
    },err=>{
    });
  }

}
