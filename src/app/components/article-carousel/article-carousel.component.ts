import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgxCarousel } from 'ngx-carousel';

import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-article-carousel',
  templateUrl: './article-carousel.component.html',
  styleUrls: ['./article-carousel.component.css']
})
export class ArticleCarouselComponent implements OnInit {

  @Input() articleList: any;
  @Input() carauselId: any;

  public carouselOne: NgxCarousel;

  // config: SwiperOptions = {
  //     pagination: '.swiper-pagination',
  //     paginationClickable: true,
  //     nextButton: '.swiper-button-next',
  //     prevButton: '.swiper-button-prev',
  //     spaceBetween: 30
  // };

  // constant for swipe action: left or right
    SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };


  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _router:Router,
  ) { }

  ngOnInit() {
    //console.log("input articleList", this.articleList)
    // console.log("input carauselId", this.carauselId)
    // for(let i=0; i<this.articleList.length; i++){
    //   this.articleList[i].visible = false;
    //   if(i==0){
    //     this.articleList[i].visible = true;
    //   }
    // }
    this.carouselOne = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true,
      custom: 'banner'
    }
  }

  public myfunc(event: Event) {
     // carouselLoad will trigger this funnction when your load value reaches
     // it is helps to load the data by parts to increase the performance of the app
     // must use feature to all carousel
  }

  // action triggered when user swipes
  swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT) {
      // out of range
      if (currentIndex > this.articleList.length || currentIndex < 0) return;

      let nextIndex = 0;

      // swipe right, next avatar
      if (action === this.SWIPE_ACTION.RIGHT) {
          const isLast = currentIndex === this.articleList.length - 1;
          nextIndex = isLast ? 0 : currentIndex + 1;
      }

      // swipe left, previous avatar
      if (action === this.SWIPE_ACTION.LEFT) {
          const isFirst = currentIndex === 0;
          nextIndex = isFirst ? this.articleList.length - 1 : currentIndex - 1;
      }

      // toggle avatar visibility
      this.articleList.forEach((x, i) => x.visible = (i === nextIndex));
  }

  // resizeImg(img) {
  //   var maxWidth = 236;
  //   var maxHeight = 400;
  //   var width = img.width;
  //   var height = img.height;
  //   var aspectW = width / maxWidth;
  //   var aspectH = height / maxHeight;
  //
  //   if (aspectW > 1 || aspectH > 1) {
  //       if (aspectW > aspectH) {
  //           img.width(maxWidth);
  //           img.height(height / aspectW);
  //       }
  //       else {
  //           img.height(maxHeight);
  //           img.width(width / aspectH);
  //       }
  //   }
  //   return img;
  // }

}
