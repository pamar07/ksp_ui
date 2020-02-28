import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-mobile-ksp-awards',
  templateUrl: './mobile-ksp-awards.component.html',
  styleUrls: ['./mobile-ksp-awards.component.css']
})
export class MobileKspAwardsComponent implements OnInit {

  public carouselOne: NgxCarousel;
  winner_list:any;
  no_of_winners:number;
  images:any;

  constructor(
    public _apiService:ApiService
  ) {
    this.no_of_winners = 33;
    this.winner_list = [];
  }

  ngOnInit() {
    window.scrollTo(0,0);

    this.carouselOne = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 400,
      interval: 3000,
      point: {
        visible: true,
        pointStyles: `
          .ngxcarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 0;
            margin: 0;
            white-space: nowrap;
            overflow: visible;
            position: absolute;
            width: auto;
            bottom: 6px;
            left: 46%;
            box-sizing: border-box;
          }
          .ngxcarouselPoint li {
            display: none;
            border-radius: 999px;
            background: rgba(255, 55, 119, 0.67);
            padding: 6px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngxcarouselPoint li.active {
              background: #ff3070;
              width: 20px;
          }
          /*.leftRs {
             position: absolute;
             margin: auto;
             top: 0;
             bottom: 0;
             width: 50px;
             height: 50px;
             box-shadow: 1px 2px 10px -1px rgba(0, 0, 0, .3);
             border-radius: 999px;
             left: 0;
         }

         .rightRs {
             position: absolute;
             margin: auto;
             top: 0;
             bottom: 0;
             width: 50px;
             height: 50px;
             box-shadow: 1px 2px 10px -1px rgba(0, 0, 0, .3);
             border-radius: 999px;
             right: 0;
         }*/

         .leftRs {
            position: absolute;
            margin: auto;
            top: 0;
            bottom: 0;
            width: 50px;
            height: 50px;
            /*box-shadow: 1px 2px 10px -1px rgba(0, 0, 0, .3);*/
            border-radius: 999px;
            left: 4px;
            background-color: rgba(255,255,255,0.2);
            border:0;
            color:#fff;
        }

        .rightRs {
            position: absolute;
            margin: auto;
            top: 0;
            bottom: 0;
            width: 50px;
            height: 50px;
            /*box-shadow: 1px 2px 10px -1px rgba(0, 0, 0, .3);*/
            border-radius: 999px;
            right: 4px;
            background-color: rgba(255,255,255,0.2);
            border:0;
            color:#fff;
        }

        .leftRs:focus, .leftRs:visited, .leftRs:active{
          outline: none!important;
        }

        .rightRs:focus, .rightRs:visited, .rightRs:active{
          outline: none!important;
        }

        .leftRs:hover{
          background-color: rgba(0,0,0,0.6)!important;
          transition: all 0.5s ease-in-out;
        }

        .rightRs:hover{
          background-color: rgba(0,0,0,0.6)!important;
          transition: all 0.5s ease-in-out;
        }
        `
      },
      load: 3,
      touch: true,
      loop: true,
      easing: 'ease',
      custom: 'banner'
    }

    for(let i=1; i<=this.no_of_winners; i++){
      this.winner_list[i-1] = (i + ".png");
    }

    this._apiService.getAwardImages().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.images = $ret.data
      }
    },err=>{
    });
  }

  public myfunc(event: Event) {
      // carouselLoad will trigger this funnction when your load value reaches
      // it is helps to load the data by parts to increase the performance of the app
      // must use feature to all carousel
   }

}
