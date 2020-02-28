import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-mobile-radio-all',
  templateUrl: './mobile-radio-all.component.html',
  styleUrls: ['./mobile-radio-all.component.css']
})
export class MobileRadioAllComponent implements OnInit {

      id:number;
      sub:any;
      radios:any;

      allPageBanners:any;
      bannerRadio:any;
      cityFilter:any;
      ageFilter:any;
      noOfItems:number;

      isRadioLoaded:boolean = false;
      isPlaylistLoaded:boolean = false;

      bannerPath:any;
      lists:any[] = [];
      playlist:any;

      paginations:number[] = [];
      totalCount:number;
      isPrevious:boolean;
      isNext:boolean;
      currentPage:number;
      noOfPaginations:number;
      limit:number;

      constructor(
        public _apiService:ApiService,
        public _commonService:CommonService,
        public _route: ActivatedRoute,
        public _router:Router,
        public _sanitizer: DomSanitizer
      ) {
        this.noOfItems = 1;
        this.noOfPaginations = 5;
        this.limit = 12;
        this.cityFilter = [];
        this.ageFilter = [];
        this.allPageBanners = [];
      }

      ngOnInit() {
        this._route
          .params
          .subscribe(params => {
            this.id = params['id'] || 0;
            this.updateRadio();
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

      updateRadio(){
        this._apiService.getRadio(1,this.noOfItems,this.cityFilter,this.ageFilter).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.bannerPath = $ret.data[0].path;
            this.bannerRadio = $ret.data[0];
            this.bannerRadio.path = this.safeUrl(this.bannerRadio.path);
            try{
              this.bannerRadio.excerpt = this.bannerRadio.excerpt.split("\r\n").join("<br/>");
              this.bannerRadio.content = this.bannerRadio.content.split("www.kidsstoppress.com/wp-content").join("i2.wp.com/www.kidsstoppress.com/wp-content");
              this.bannerRadio.content = this.bannerRadio.content.split("<a ").join("<a style='color:#ff007b!important;'");
            }
            catch(e){}
            }
            this.isRadioLoaded = true;
        },err=>{
        });

        this._apiService.getPlaylistRadio().subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1) {
            this.lists = $ret.data;
            this.getRadioTracks(1, this.lists[0]);
          }
        },err=>{

        });
      }

      safeUrl(url) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(url);
      }
      safeHtml(html) {
        return this._sanitizer.bypassSecurityTrustHtml(html);
      }

      filterCity(cityList){
        let cityNames = [];
        for(let i=0; i<cityList.length; i++){
          cityNames[i]=cityList[i].id;
        }
        this.cityFilter = cityNames;
        this.isRadioLoaded = false;
        this.updateRadio();
      }

      filterAge(ageList){
        let ageIds = [];
        for(let i=0; i<ageList.length; i++){
          ageIds[i]=ageList[i].id;
        }
        this.ageFilter = ageIds;
        this.isRadioLoaded = false;
        this.updateRadio();
      }

      setRadio(id,url,title){
        for(let i=0; i<this.lists.length; i++){
          for(let j=0; j<this.lists[i].tracks.length; j++){
            if(this.lists[i].tracks[j].id == id){
              this.lists[i].tracks[j].playing = !this.lists[i].tracks[j].playing;
              if(this.lists[i].tracks[j].playing){
                this._commonService.setCurrentRadioPath(url,title);
              }
              else{
                this._commonService.radioPlaying = false;
              }
            }
            else{
              this.lists[i].tracks[j].playing = false;
            }
          }
        }
      }

      getRadioTracks(page, playlist) {
        this.isPlaylistLoaded = false;
        this.playlist = playlist;
        this.currentPage = page;
        let reqData = {
          id: this.playlist.id,
          offset: (page - 1) * this.limit,
          limit: this.limit
        };

        this._apiService.getAllPlaylistTracks(reqData).subscribe(retTracks=>{
          let $retTracks = retTracks.ret;
          if($retTracks.code == 1) {
            this.playlist.tracks = $retTracks.data.record.clips;
            this.playlist.tracks.playing = false;

            this.totalCount = $retTracks.data.count;
            this.isPrevious = false;
            this.isNext     = true;
            this.currentPage = page;
            this.noOfPaginations = 5;

            if(Math.ceil(this.totalCount/this.limit)<=this.noOfPaginations){
              this.noOfPaginations = Math.ceil(this.totalCount/this.limit);
            }
            console.log(this.noOfPaginations);

            if(page == 1){
              this.paginations = [];
              for(let i=1; i<=this.noOfPaginations; i++){
                this.paginations[i-1] = i;
              }
            } else if(page >= this.noOfPaginations){
              for(let i=1; i<=this.noOfPaginations; i++){
                this.paginations[i-1] = page-this.noOfPaginations+i;;
              }
            }
          }
        },err=>{
          this.playlist.tracks = [];
        });
      }
}
