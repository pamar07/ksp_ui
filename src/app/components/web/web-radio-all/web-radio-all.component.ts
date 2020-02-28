import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-web-radio-all',
  templateUrl: './web-radio-all.component.html',
  styleUrls: ['./web-radio-all.component.css']
})
export class WebRadioAllComponent implements OnInit {

  allPageBanners: any;
  id: number;
  sub: any;
  radios: any;

  bannerRadio: any;
  cityFilter: any;
  ageFilter: any;

  /*For playlist1 pagination*/
  noOfItems: number;
  paginations: number[] = [];
  totalCount: number;
  isPrevious: boolean;
  isNext: boolean;
  currentPage: number;
  noOfPaginations: number;

  /*For playlist2 pagination*/
  noOfItems2: number;
  paginations2: number[] = [];
  totalCount2: number;
  isPrevious2: boolean;
  isNext2: boolean;
  currentPage2: number;
  noOfPaginations2: number;

  isRadioLoaded: boolean = false;
  isPlaylistLoaded: boolean = false;

  bannerPath: any;
  lists: any;
  playlist1: any;
  playlist2: any;
  curr_playlist1: any;
  curr_playlist2: any;
  showPlaylist1: boolean;
  showPlaylist2: boolean;

  promotions: any;
  promotionsArr: any = [];

  constructor(
    public _apiService: ApiService,
    public _commonService: CommonService,
    public _route: ActivatedRoute,
    public _router: Router,
    public _sanitizer: DomSanitizer
  ) {
    this.noOfItems = 12;
    this.noOfItems2 = 12;
    this.cityFilter = [];
    this.ageFilter = [];
    this.showPlaylist1 = true;
    this.showPlaylist2 = false;
    this.allPageBanners = [];
  }

  ngOnInit() {
    this._route
      .params
      .subscribe(params => {
        this.id = params['id'] || 0;
        this.updateRadio();
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
        for (let i = 1; i <= this.promotions.length; i++) {
          this.promotionsArr[i * 4] = this.promotions[i - 1];
        }
      } else {
        this.promotions = [];
      }
    }, err => {
    });
  }

  updateRadio() {
    this.noOfPaginations = 9;
    this.noOfPaginations2 = 9;
    this._apiService.getRadio(1, 3, this.cityFilter, this.ageFilter).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.bannerRadio = $ret.data;
        for (let i = 0; i < this.bannerRadio.length; i++) {
          this.bannerRadio[i].path = this.safeUrl(this.bannerRadio[i].path);
        }
      }
    }, err => { });

    this.isRadioLoaded = false;
    this._apiService.getPlaylistRadio().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.lists = $ret.data;
        if (this.lists.length > 0) {
          this.playlist1 = this.lists[0];
        }
        if (this.lists.length > 1) {
          this.playlist2 = this.lists[1];
        }
        for (let i = 0; i < $ret.data.length; i++) {
          this._apiService.getPlaylistTracks(this.lists[i].id).subscribe(retTracks => {
            let $retTracks = retTracks.ret;
            if ($retTracks.code == 1) {
              this.lists[i].tracks = $retTracks.data.clips;
              this.lists[i].tracks.playing = false;
              for (let j = 0; j < this.lists[i].tracks.length; j++) {
                this.lists[i].tracks[j].path = this.safeUrl(this.lists[i].tracks[j].path);
              }
              if (i == 0) {
                this.isRadioLoaded = true;
                this.totalCount = this.playlist1.tracks.length;
                this.isPrevious = false;
                this.isNext = true;
                this.currentPage = 1;
                this.curr_playlist1 = this.lists[i].tracks.slice((this.currentPage - 1) * 12, 12);
                if (Math.ceil(this.totalCount / this.noOfItems) <= this.noOfPaginations) {
                  this.noOfPaginations = Math.ceil(this.totalCount / this.noOfItems);
                }
                this.paginations.length = 0;
                for (let i = 1; i <= this.noOfPaginations; i++) {
                  this.paginations[i - 1] = i;
                }
              }
              if (i == 1) {
                this.totalCount2 = this.playlist2.tracks.length;
                this.isPrevious2 = false;
                this.isNext2 = true;
                this.currentPage2 = 1;
                this.curr_playlist2 = this.lists[i].tracks.slice((this.currentPage2 - 1) * 12, 12);
                if (Math.ceil(this.totalCount2 / this.noOfItems2) <= this.noOfPaginations2) {
                  this.noOfPaginations2 = Math.ceil(this.totalCount2 / this.noOfItems2);
                }
                this.paginations2.length = 0;
                for (let i = 1; i <= this.noOfPaginations2; i++) {
                  this.paginations2[i - 1] = i;
                }
              }
            }
          }, err => {
          });
        }

        this.isPlaylistLoaded = true;
      }
    }, err => {

    });
  }

  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  filterCity(cityList) {
    let cityNames = [];
    for (let i = 0; i < cityList.length; i++) {
      cityNames[i] = cityList[i].id;
    }
    this.cityFilter = cityNames;
    this.isRadioLoaded = false;
    this.updateRadio();
  }

  filterAge(ageList) {
    let ageIds = [];
    for (let i = 0; i < ageList.length; i++) {
      ageIds[i] = ageList[i].id;
    }
    this.ageFilter = ageIds;
    this.isRadioLoaded = false;
    this.updateRadio();
  }

  setRadio(id, url, title) {
    for (let i = 0; i < this.lists.length; i++) {
      for (let j = 0; j < this.lists[i].tracks.length; j++) {
        if (this.lists[i].tracks[j].id == id) {
          this.lists[i].tracks[j].playing = !this.lists[i].tracks[j].playing;
          if (this.lists[i].tracks[j].playing) {
            this._commonService.setCurrentRadioPath(url, title);
          }
          else {
            this._commonService.radioPlaying = false;
          }
        }
        else {
          this.lists[i].tracks[j].playing = false;
        }
      }
    }
  }

  getNewPage(pageNo) {
    if (pageNo < 1) {
      this.isPrevious = false;
    }
    else if (pageNo > Math.ceil(this.totalCount / this.noOfItems)) {
      this.isNext = false;
    }
    else {
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
      this.curr_playlist1 = this.playlist1.tracks.slice((pageNo - 1) * 12, ((pageNo - 1) * 12 + 12));
    }
  }

  getNewPage2(pageNo) {
    if (pageNo < 1) {
      this.isPrevious2 = false;
    }
    else if (pageNo > Math.ceil(this.totalCount2 / this.noOfItems2)) {
      this.isNext2 = false;
    }
    else {
      this.currentPage2 = pageNo;
      this.isPrevious2 = true;
      if (pageNo == 1) {
        this.isPrevious2 = false;
      }
      if (pageNo == Math.ceil(this.totalCount2 / this.noOfItems2)) {
        this.isNext2 = false;
      }
      else {
        this.isNext2 = true;
      }
      if (pageNo >= this.noOfPaginations2) {
        for (let i = 1; i <= this.noOfPaginations2; i++) {
          this.paginations2[i - 1] = pageNo - this.noOfPaginations2 + i;
        }
      }
      this.curr_playlist2 = this.playlist2.tracks.slice((pageNo - 1) * 12, ((pageNo - 1) * 12 + 12));
    }
  }
}
