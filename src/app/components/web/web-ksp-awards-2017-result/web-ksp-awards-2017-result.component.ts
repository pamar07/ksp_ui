import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../services/api.service';

declare var award2017CarouselObj:any;

@Component({
  selector: 'app-web-ksp-awards-2017-result',
  templateUrl: './web-ksp-awards-2017-result.component.html',
  styleUrls: ['./web-ksp-awards-2017-result.component.css']
})
export class WebKspAwards2017ResultComponent implements OnInit {

  categories:any;
  banners:any;
  images:any;
  videos:any;
  mainPageShareCount:any;

  constructor(public _apiService:ApiService) {
    this.banners = [];
    this.images = [];
    this.videos = [];
    this.mainPageShareCount = 0;
  }

  ngOnInit() {

    this._apiService.getAwardWinnerRunnerUPList().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.categories = $ret.data;
        this.categories = this.getRandom(this.categories,3);
      }
    },err=>{
    });

    this._apiService.getAward2017CMSContents().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.banners = $ret.data.filter(item => item.type == 3);
        this.images = $ret.data.filter(item => item.type == 1);
        this.videos = $ret.data.filter(item => item.type == 2);
        award2017CarouselObj.load();
      }
    },err=>{
    });

    /*Calculate main page share count*/
    this._apiService.getShareCount(this._apiService.share_url + 'KSPAwards2017').subscribe(ret_share=>{
      this.mainPageShareCount = ret_share.shares;
    });
  }

  getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

}
