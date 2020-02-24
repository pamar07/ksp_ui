import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-mobile-search-result',
  templateUrl: './mobile-search-result.component.html',
  styleUrls: ['./mobile-search-result.component.css']
})
export class MobileSearchResultComponent implements OnInit {

  articles:any;
  tvs:any;
  radios:any;
  events:any;
  
  key:string;
  search_key:string;

  cityList:any;
  categoryList:any;
  ageGroups:any;

  isArticle:boolean;
  isTv:boolean;
  isRadio:boolean;
  isEvent:boolean;
  
  isArticleShow:boolean;
  isTvShow:boolean;
  isRadioShow:boolean;
  isEventShow:boolean;
  
  filterList:any;
  allFilterChecked:boolean;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _sanitizer: DomSanitizer,
    public _route: ActivatedRoute
  ) {
    this.articles = [];
    this.tvs = [];
    this.radios = [];
    this.events = [];
    this.search_key = '';
  }

  ngOnInit() {
    this.articles = [];
    this.tvs = [];
    this.radios = [];
    this.events = [];
    this.search_key = '';
    this._route
      .params
      .forEach(params => {
        this.key = params['text'] || '';
        this.search_key = 'Loading';
        this.articles = [];
        this.tvs = [];
        this.radios = [];
        this.events = [];
        this.isArticle = true;
        this.isTv = true;
        this.isRadio = true;
        this.isEvent = true;
        this.isArticleShow = true;
        this.isTvShow = true;
        this.isRadioShow = true;
        this.isEventShow = true;

        this.filterList = [
          {'id':1,'name':'Article','checked':false},
          {'id':2,'name':'TV','checked':false},
          {'id':3,'name':'Radio','checked':false},
          {'id':4,'name':'Event','checked':false}
        ];

        if(this._commonService.searchType == "ARTICLE"){
          this.filterList[0].checked = true;
          this.searchArticle();
          this.isTvShow = false;
          this.isRadioShow = false;
          this.isEventShow = false;
          this.isTv = false;
          this.isRadio = false;
          this.isEvent = false;
        }
        else if(this._commonService.searchType == "TV"){
          this.filterList[1].checked = true;
          this.searchTv();
          this.isArticleShow = false;
          this.isRadioShow = false;
          this.isEventShow = false;
          this.isArticle = false;
          this.isRadio = false;
          this.isEvent = false;
        }
        else if(this._commonService.searchType == "RADIO"){
          this.filterList[2].checked = true;
          this.searchRadio();
          this.isArticleShow = false;
          this.isTvShow = false;
          this.isEventShow = false;
          this.isTv = false;
          this.isArticle = false;
          this.isEvent = false;
        }
        else if(this._commonService.searchType == "EVENT"){
          this.filterList[3].checked = true;
          this.searchEvent();
          this.isTvShow = false;
          this.isRadioShow = false;
          this.isArticleShow = false;
          this.isArticle = false;
          this.isRadio = false;
          this.isTv = false;
        }
        else{
          for(let i=0; i<this.filterList.length; i++){
            this.filterList[i].checked = true;
          }
          this.searchArticle();
          this.searchTv();
          this.searchRadio();
          this.searchEvent();
        }

        this.allFilterChecked = true;
        for(let i=0; i<this.filterList.length; i++){
          if(!this.filterList[i].checked){
            this.allFilterChecked = false;
            break;
          }
        }

        this._apiService.saveSearchedItem(this.key).subscribe(ret=>{ },err=>{ });

      });
  }

  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  searchArticle(){
    this._apiService.fetchSearchedArticle(this.key).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.articles = $ret.data.articles;
        this.search_key = this.key;
        this.isArticle = false;
      }
    },err=>{
    });
  }

  searchTv(){
    this._apiService.fetchSearchedTv(this.key).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.tvs = $ret.data.tv;
        this.search_key = this.key;
        this.isTv = false;
      }
    },err=>{
    });
  }

  searchRadio(){
    this._apiService.fetchSearchedRadio(this.key).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.radios = $ret.data.radio;
        this.search_key = this.key;
        this.isRadio = false;
        for(let i=0; i<this.radios.length; i++){
          this.radios[i].path = this.safeUrl(this.radios[i].path);
        }
      }
    },err=>{
    });
  }

  searchEvent(){
    this._apiService.fetchSearchedEvent(this.key, 'event').subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.events = $ret.data.event;
        this.search_key = this.key;
        this.isEvent = false;
      }
    },err=>{
    });
  }

  setFilter(id){
    if(!this.allFilterChecked){
      this.filterList[id].checked = !this.filterList[id].checked;
      this.allFilterChecked = true;
      for(let i=0; i<this.filterList.length; i++){
        if(this.filterList[i].checked){
          this.allFilterChecked = false;
          break;
        }
      }
      if(this.allFilterChecked){
        this.isArticleShow = true;
        this.isTvShow = true;
        this.isRadioShow = true;
        this.isEventShow = true;
        for(let i=0; i<this.filterList.length; i++){
          this.filterList[i].checked = true;
        }
        if(this.isArticleShow && this.articles.length==0){
          this.isArticle = true;
          this.searchArticle();
        }
        if(this.isTvShow && this.tvs.length==0){
          this.isTv = true;
          this.searchTv();
        }
        if(this.isRadioShow && this.radios.length==0){
          this.isRadio = true;
          this.searchRadio();
        }
        if(this.isEventShow && this.events.length==0){
          this.isEvent = true;
          this.searchEvent();
        }
      }
    }
    else{
      for(let i=0; i<this.filterList.length; i++){
        if(i!=id){
          this.filterList[i].checked = false;
        }
      }
      if(this.isArticleShow && this.isTvShow && this.isRadioShow && this.isEventShow){
        if(id==0){
          this.isTvShow = false;
          this.isRadioShow = false;
          this.isEventShow = false;
        }
        else if(id==1){
          this.isArticleShow = false;
          this.isRadioShow = false;
          this.isEventShow = false;
        }
        else if(id==2){
          this.isArticleShow = false;
          this.isTvShow = false;
          this.isEventShow = false;
        }
        else if(id==3){
          this.isArticleShow = false;
          this.isRadioShow = false;
          this.isTvShow = false;
        }
      }
    }
    if(id == 0){
      if(!this.isArticleShow && this.articles.length==0){
        this.isArticle = true;
        this.searchArticle();
      }
      if(this.filterList[id].checked){
        this.isArticleShow = true;
      }
      else{
        this.isArticleShow = false;
      }
      // this.isArticleShow = !this.isArticleShow;
    }
    else if(id ==1){
      if(!this.isTvShow && this.tvs.length==0){
        this.isTv = true;
        this.searchTv();
      }
      if(this.filterList[id].checked){
        this.isTvShow = true;
      }
      else{
        this.isTvShow = false;
      }
      // this.isTvShow = !this.isTvShow;
    }
    else if(id == 2){
      if(!this.isRadioShow && this.radios.length==0){
        this.isRadio = true;
        this.searchRadio();
      }
      if(this.filterList[id].checked){
        this.isRadioShow = true;
      }
      else{
        this.isRadioShow = false;
      }
      // this.isRadioShow = !this.isRadioShow;
    }
    else if(id == 3){
      if(!this.isEventShow && this.events.length==0){
        this.isEvent = true;
        this.searchEvent();
      }
      if(this.filterList[id].checked){
        this.isEventShow = true;
      }
      else{
        this.isEventShow = false;
      }
      // this.isEventShow = !this.isEventShow;
    }

    this.allFilterChecked = true;
    for(let i=0; i<this.filterList.length; i++){
      if(!this.filterList[i].checked){
        this.allFilterChecked = false;
        break;
      }
    }
  }

  stopPropagation(e){
    e.stopPropagation();
  }

}
