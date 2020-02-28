import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-awards-result',
  templateUrl: './awards-result.component.html',
  styleUrls: ['./awards-result.component.css']
})
export class AwardsResultsComponent implements OnInit {

  constructor(public apiService: ApiService, public activatedRoute: ActivatedRoute) { }

  winners = [];
  bannerImage: any;
  silderImage: any;
  hideLdMore = true;
  imageurl1: any;
  imageurl: any;
  token: any;
  id: any;
  logo: any = [];
  carouselOptions1 = {
    margin: 25,
    nav: true,
   responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 10000,
        autoplayHoverPause: true
      },
      600: {
        items: 1,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 10000,
        autoplayHoverPause: true
      },
      1000: {
        items: 1,
        nav: true,
        loop: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 10000,
        autoplayHoverPause: true
      }
    }
  };
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'] || 0;
      if (params['token']) {
        this.token = params['token'];
        // console.log(this.token);
        localStorage.setItem('token', this.token);
        this.getUserDetails();
      }
      this.apiService.getAwardsWinnersList(this.id).subscribe((resp) => {
        if (resp.ret.code === 1) {
          // for (let i = 0; i < 6; i++) {
          //   this.winners.push(resp.ret.data[i]);
          // }
          this.winners = resp.ret.data;
          // console.log('winner list is', this.winners);
        }
    }, err => {
      // console.log('Something went wrong' + err);
    });
    });
    this.apiService.getAwardHighlightImage().subscribe((resp) => {
      // console.log(resp.ret);
      if (resp.ret.code === 1) {
        this.bannerImage = resp.ret.image[0].image;
        console.log(this.bannerImage);
        this.logo = resp.ret.logo;
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

      }
  }, err => {
    console.log('Something went wrong' + err);
  });
  }
  getUserDetails() {
    this.apiService.getUserDetails().subscribe(response => {
      const $ret = response.ret;
      // console.log($ret.data);
      if ($ret.code === 1) {
        this.apiService.storeUserData($ret.data.api_token, $ret.data);
      }
    }, err => {
    });
  }
  loadMore() {

    console.log('load More clicked');
    this.winners = [];
    this.apiService.getWinnersApi().subscribe((resp) => {
      // console.log(resp.ret);
      if (resp.ret.code === 1) {
        for (let i = 0; i < resp.ret.data.length; i++) {
          this.winners.push(resp.ret.data[i]);
        }
          // this.winners = resp.ret.data;
          // console.log(this.winners);
        if (this.winners.length > 6) {
            this.hideLdMore = false;
            // console.log('More than 6');
        }
      }
    }, err => {
        // console.log('Something went wrong' + err);
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
