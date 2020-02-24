import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../services/api.service';

declare var award2017CarouselObj:any;

@Component({
  selector: 'app-mobile-ksp-awards-2017-result',
  templateUrl: './mobile-ksp-awards-2017-result.component.html',
  styleUrls: ['./mobile-ksp-awards-2017-result.component.css']
})
export class MobileKspAwards2017ResultComponent implements OnInit {

  categories:any;
  banners:any;
  images:any;
  videos:any;
  mainPageShareCount:any;
  zoomImage:any;
  zoomImageDownloadPath:any;

  mobileVideoPreview:any;

  constructor(public _apiService:ApiService) {
    this.banners = [];
    this.images = [];
    this.videos = [];
    this.mainPageShareCount = 0;
    this.zoomImage = "";
    this.mobileVideoPreview = [
      "assets/images/new-images/first_video_preview.png",
      "assets/images/new-images/second_video_preview.png",
      "assets/images/new-images/third_video_preview.png",
      "assets/images/new-images/fourth_video_preview.png"
    ];
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

  zoomImageToggle(img){
    this.zoomImage = img;
    this.zoomImageDownloadPath = this.zoomImage.replace(/^.*\/\/[^\/]+/, '');
    $('#zoom-img').toggleClass('hide');
    $('#zoom-img-dim').toggleClass('hide');
  }

}
