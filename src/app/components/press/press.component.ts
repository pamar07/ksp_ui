import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.css']
})
export class PressComponent implements OnInit {

  pressData:any;
  title:any;
  articles:any;

  articleEnd:boolean = false;
  advertisement:number;
  promotions:any;
  mobilePromo:any;
  carouselTile:any;
  carouselLogo:any;
  mediaPartners:any;

  constructor(public _apiService:ApiService, public _sanitizer: DomSanitizer) {
    this.carouselTile = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 1,
      touch: true,
      easing: 'ease',
      loop: true
    }

    this.carouselLogo = {
      grid: {xs: 2, sm: 2, md: 4, lg: 4, all: 0},
      slide: 1,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 1,
      touch: true,
      easing: 'ease',
      loop: true
    }
  }

  ngOnInit() {

    this.advertisement = 0;
    this.articleEnd =false;
    window.scrollTo(0,0);

    this._apiService.showPress().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.title      = $ret.data.title.title;
        this.pressData  = $ret.data.press;
        this.pressData.forEach((item, index) => {
          if(item.type == 'video') {
            this.pressData[index].path = this.safeUrl('https://www.youtube.com/embed/'+item.path);
          }
        }); 
        this.articles   = $ret.data.articles;
      }
    },err=>{
    });

    this._apiService.getPromotionDetails().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        let adevertisement             = $ret.data.adevertisement;
        let emailAdvertisement         = $ret.data.emailAdvertisement;
        let shop                       = $ret.data.shop;
        let innerPromo                 = $ret.data.data;                
        
   
        /*change the sequence of promo card: third party first then the inner promos*/
        let tmp = [];
        tmp.push.apply(tmp, adevertisement);
        tmp.push.apply(tmp, emailAdvertisement);
        tmp.push.apply(tmp, shop);
        tmp.push.apply(tmp, innerPromo);
        this.promotions = tmp;
        this.mobilePromo = tmp;
      }else{
        this.promotions = [];
        this.mobilePromo = [];
      }
    },err=>{
    });

    this.mediaPartners = [
      {'path': 'assets/images/media-partners/1.png'},
      {'path': 'assets/images/media-partners/2.jpg'},
      {'path': 'assets/images/media-partners/3.png'},
      {'path': 'assets/images/media-partners/4.png'},
      {'path': 'assets/images/media-partners/5.jpg'},
      {'path': 'assets/images/media-partners/6.jpg'},
      {'path': 'assets/images/media-partners/7.jpg'},
      {'path': 'assets/images/media-partners/8.png'},
      {'path': 'assets/images/media-partners/9.png'},
      {'path': 'assets/images/media-partners/10.jpg'},
      {'path': 'assets/images/media-partners/11.jpg'},
      {'path': 'assets/images/media-partners/12.jpg'},
      {'path': 'assets/images/media-partners/13.png'},
      {'path': 'assets/images/media-partners/14.png'},
    ];
  }

  getAdvertisement(){
    if(!this.articleEnd){
      this.advertisement = this.advertisement + 1;
    }
  }

  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
