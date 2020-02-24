import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';


@Component({
  selector: 'app-web-tv-all',
  templateUrl: './web-tv-all.component.html',
  styleUrls: ['./web-tv-all.component.css']
})
export class WebTvAllComponent implements OnInit {

  allPageBanners: any;
  id: number;
  sub: any;
  tvs: any;
  paginations: number[] = [];
  totalCount: number;
  isPrevious: boolean;
  isNext: boolean;
  currentPage: number;
  noOfItems: number;
  noOfPaginations: number;

  bannerTv: any;
  cityFilter: any;
  ageFilter: any;

  isTvLoaded: boolean = false;
  promotions: any;
  promotionsArr: any = [];

  constructor(
    public _apiService: ApiService,
    public _commonService: CommonService,
    public _sanitizer: DomSanitizer,
    public _route: ActivatedRoute,
    public _router: Router
  ) {
    this.noOfItems = 15;
    this.noOfPaginations = 9;
    this.cityFilter = [];
    this.ageFilter = [];
    this.allPageBanners = [];
  }

  ngOnInit() {
    this._route
      .params
      .subscribe(params => {
        this.id = params['id'] || 0;
        this.updateTv();
        this._apiService.getAllPageBanners(this._commonService.noOfAllPageBanners).subscribe(ret => {
          let $ret = ret.ret;
          if ($ret.code == 1) {
            this.allPageBanners = $ret.data;
          } else {
            this.allPageBanners = [];
          }
        }, err => {
        });
      });

    this._apiService.getPromotionDetails().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        let tmp = [];
        let allPromotions = $ret.data.data;
        let adds = $ret.data.advertisement;

        let outerPromo = allPromotions.filter(item => (item.type == 2));
        tmp.push.apply(tmp, adds);
        tmp.push.apply(tmp, outerPromo);

        this.promotions = tmp;
        for (var i = 1; i <= this.promotions.length; i++) {
          this.promotionsArr[i * 4] = this.promotions[i - 1];
        }
        console.log(this.promotionsArr);
      } else {
        this.promotions = [];
      }
    }, err => {
    });
  }

  getNewPage(pageNo) {
    if (pageNo < 1) {
      this.isPrevious = false;
    }
    else if (pageNo > Math.ceil(this.totalCount / this.noOfItems)) {
      this.isNext = false;
    }
    else {
      this.isTvLoaded = false;
      this.currentPage = pageNo;
      this.isPrevious = true;
      if (pageNo == 1) {
        this.isPrevious = false;
      }
      if (pageNo == Math.ceil(this.totalCount / this.noOfItems)) {
        this.isNext = false;
      }
      else {
        this.isNext = true;
      }
      if (pageNo >= this.noOfPaginations) {
        for (let i = 1; i <= this.noOfPaginations; i++) {
          this.paginations[i - 1] = pageNo - this.noOfPaginations + i;
        }
      }
      this._apiService.getTv(pageNo, this.noOfItems, this.cityFilter, this.ageFilter).subscribe(ret => {
        let $ret = ret.ret;
        if ($ret.code == 1) {
          if ($ret.data.length > 3) {
            this.bannerTv = $ret.data.slice(0, 3);
            this.tvs = $ret.data.slice(3, $ret.data.length);
            this.isTvLoaded = true;
          }
          else {
            this.bannerTv = [];
            this.tvs = $ret.data;
          }
        }
      }, err => {
      });
    }
  }

  safeStyle(style) {
    return this._sanitizer.bypassSecurityTrustStyle(style);
  }

  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  filterCity(cityList) {
    let cityNames = [];
    for (let i = 0; i < cityList.length; i++) {
      cityNames[i] = cityList[i].id;
    }
    this.cityFilter = cityNames;
    this.isTvLoaded = false;
    this.updateTv();
  }

  filterAge(ageList) {
    let ageIds = [];
    for (let i = 0; i < ageList.length; i++) {
      ageIds[i] = ageList[i].id;
    }
    this.ageFilter = ageIds;
    this.isTvLoaded = false;
    this.updateTv();
  }

  updateTv() {
    this.noOfPaginations = 9;
    this._apiService.getTv(1, this.noOfItems, this.cityFilter, this.ageFilter).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        if ($ret.data.length > 3) {
          this.bannerTv = $ret.data.slice(0, 3);
          this.tvs = $ret.data.slice(3, $ret.data.length);
        }
        else {
          this.bannerTv = [];
          this.tvs = $ret.data;
        }
        this.totalCount = $ret.tvCount;
        this.isPrevious = false;
        this.isNext = true;
        this.currentPage = 1;
        if (Math.ceil(this.totalCount / this.noOfItems) <= this.noOfPaginations) {
          this.noOfPaginations = Math.ceil(this.totalCount / this.noOfItems);
        }
        this.paginations.length = 0;
        for (let i = 1; i <= this.noOfPaginations; i++) {
          this.paginations[i - 1] = i;
        }
        this.isTvLoaded = true;
      }
    }, err => {
    });
  }

}
