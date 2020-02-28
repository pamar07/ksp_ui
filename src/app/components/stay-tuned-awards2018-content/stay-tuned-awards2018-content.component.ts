import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-stay-tuned-awards2018-content',
  templateUrl: './stay-tuned-awards2018-content.component.html',
  styleUrls: ['./stay-tuned-awards2018-content.component.css']
})
export class StayTunedAwards2018ContentComponent implements OnInit {

  constructor(public apiService: ApiService) { }

  winners = [];
  bannerImage: any;
  silderImage: any;
  hideLdMore = true;
  imageurl1: any;
  imageurl: any;
  carouselOptions1 = {
    margin: 25,
    nav: true,
    navText: ["<div style='color: #fff !important;position: absolute !important;bottom: 50% !important;left: 0 !important;background: rgba(0, 0, 0, 0.28);padding: 17px 26px;font-size: 23px;border-radius:50%;' class='nav-btn prev-slide'><i class='fa fa-chevron-left' aria-hidden='true'></i></div>",
      "<div style='color: #fff;position: absolute;bottom: 50%;right: 0;background: rgba(0, 0, 0, 0.28);padding: 17px 26px;font-size: 23px;border-radius:50%;' class='nav-btn next-slide'><i class='fa fa-chevron-right' aria-hidden='true'></i></div>"],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
      },
      600: {
        items: 1,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
      },
      1000: {
        items: 1,
        nav: false,
        loop: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
      },
      1500: {
        items: 1,
        nav: false,
        loop: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
      }
    }
  };
  ngOnInit() {

    this.apiService.getWinnersApi().subscribe((resp) => {
        // console.log(resp.ret);
        if (resp.ret.code === 1) {
          for (let i = 0; i < 6; i++) {
            this.winners.push(resp.ret.data[i]);
          }
            // this.winners = resp.ret.data;
            // console.log(this.winners);
        }
    }, err => {
      console.log('Something went wrong' + err);
    });
    this.apiService.getAwardImage().subscribe((resp) => {
      console.log(resp.ret);
      if (resp.ret.code === 1) {
        this.bannerImage = resp.ret.image;
        this.imageurl = this.bannerImage;
        let haystack = this.imageurl;
        let needle = '/';
        let replacement = '/w_' + 1600 + '/';
        haystack = Array.from(haystack).reverse().join('');
        needle = Array.from(needle).reverse().join('');
        replacement = Array.from(replacement).reverse().join('');
        haystack = haystack.replace(needle, replacement);
        const results = Array.from(haystack).reverse().join('');
        this.bannerImage = results;
        this.silderImage = resp.ret.banner;
          for (let i = 0; i < this.silderImage.length; i++) {
          this.imageurl1 = this.silderImage[i];
         let haystack1 = this.imageurl1;
         let needle1 = '/';
         let replacement1 = '/w_' + 800 + '/';
         haystack1 = Array.from(haystack1).reverse().join('');
         needle1 = Array.from(needle1).reverse().join('');
         replacement1 = Array.from(replacement1).reverse().join('');
         haystack1 = haystack1.replace(needle1, replacement1);
         const results1 = Array.from(haystack1).reverse().join('');
         this.silderImage[i] = results1;
        }
      }
  }, err => {
    console.log('Something went wrong' + err);
  });
  }

  loadMore() {

    console.log('load More clicked');
    this.winners = [];
    this.apiService.getWinnersApi().subscribe((resp) => {
      console.log(resp.ret);
      if (resp.ret.code === 1) {
        for (let i = 0; i < resp.ret.data.length; i++) {
          this.winners.push(resp.ret.data[i]);
        }
          // this.winners = resp.ret.data;
          console.log(this.winners);
        if (this.winners.length > 6) {
            this.hideLdMore = false;
            console.log('More than 6');
        }
      }
    }, err => {
        console.log('Something went wrong' + err);
    });

    setTimeout(() => {

      const thumbInnerWrap = document.querySelectorAll('.thumb_inner_wrapper');
      const awardWrapper = document.querySelector('.award_thumbnail_wrapper');
      let innerThumsHeight = 0;
      let heightForAWrap = 0;
      let divisable = 0;
      let addition_factor = 0;

      for (let i = 0; i < thumbInnerWrap.length; i++) {
        innerThumsHeight += thumbInnerWrap[i]['offsetHeight'];
      }

      if (window.innerWidth > 800) {
        divisable = 2.9;
      }
      if (window.innerWidth < 800) {
        divisable = 1.8;
      }
      if (window.innerWidth < 600) {
        divisable = 1;
        addition_factor =  1400;
      }

      heightForAWrap = innerThumsHeight / divisable + addition_factor;
      awardWrapper['style'].maxHeight = heightForAWrap + 'px';
      awardWrapper.classList.remove('flex-row');


    }, 5000);

  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
}
}
