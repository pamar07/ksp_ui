import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgxCarousel } from 'ngx-carousel';
import { DatePipe } from '@angular/common';

import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service'

@Component({
  selector: 'app-generic-carousel',
  templateUrl: './generic-carousel.component.html',
  styleUrls: ['./generic-carousel.component.css'],
  providers: [DatePipe]
})
export class GenericCarouselComponent implements OnInit {

  @Input() articleList:any;
  @Input() carauselId:any;

  public carouselOne: NgxCarousel;

  // constant for swipe action: left or right
    SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _router:Router,
    public _pipe: DatePipe
  ) { }

  ngOnInit() {

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

  getOnlyDate(date){
    let newDate;
    if(date!=null){
      newDate = date.split(' ').join('T');
      newDate = new Date(newDate);
    }
    else{
      newDate = new Date();
    }
    return this._pipe.transform(new Date(newDate), 'yyyy-MM-dd');
  }

}
