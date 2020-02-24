import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/pairwise';

import { ApiService } from '../services/api.service';
import { HttpEventType } from '@angular/common/http';

@Injectable()
export class CommonService {

  navUrl: any;
  currentRadioPath: any;
  currentRadioName: string;
  radioPlaying = false;

  showBottomNav = true;
  urlBeforeLogin: any;

  searchType: string;

  showMobileFilter: boolean;

  signupPopupClicked: boolean;

  nolink: any;
  noOfAllPageBanners: any;

  constructor(
    private _router: Router,
    public _apiService: ApiService,
    private _sanitizer: DomSanitizer
  ) {
    this.navUrl = '';
    this.currentRadioPath = this.safeUrl('https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/346066943');
    this.currentRadioName = 'Play Radio';
    this.urlBeforeLogin = '/home';
    this.searchType = 'ALL';
    this.showMobileFilter = false;
    this.signupPopupClicked = false;
    this.noOfAllPageBanners = 2;
    this.nolink = this.safeTrustUrl('javascript:void(0);');
  }

  randomString() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  setNavigationUrl(entityType, entityId, permaLink) {
    if (entityType == 'post' || entityType == 'banner') {
      this.navUrl = '/article-individual/' + permaLink + '/' + entityId;
    }
    else if (entityType == 'videos' || entityType == 'ksp-tv') {
      this.navUrl = '/tv-individual/' + permaLink + '/' + entityId;
    }
    else if (entityType == 'ksp-radio') {
      this.navUrl = '/radio-individual/' + permaLink + '/' + entityId;
    }
    else if (entityType == 'social-group') {
      this.navUrl = '/post-individual/' + entityId;
    }
    else if (entityType == 'event') {
      this.navUrl = '/event-individual/' + permaLink + '/' + entityId;
    }
    else if (entityType == 'awards') {
      this.navUrl = '/awards/2019';
    }
    else if (entityType == 'awards/2019') {
      this.navUrl = '/awards/2019';
    }
    else if (entityType == 'pdf') {
      this.navUrl = '/ksp-magazine';
    } else if (entityType == 'awards') {
      this.navUrl = '/' + permaLink;
    } else if (entityType == 'voting') {
      this.navUrl = '/' + permaLink + '/' + entityId;
    }
    else {
      this.navUrl = this._router.url;
    }
    console.log(this.navUrl);
    this._router.navigate(['/pre-login-register']);
  }

  setNavigationUrlLogin(entityType, entityId, permaLink) {
    if (entityType === 'awards') {
      this.navUrl = '/awards-5';
    } else {
      this.navUrl = this._router.url;
    }
    this._router.navigate(['/login']);
  }

  setDateFormat(date) {
    if (date != null && date != '0000-00-00') {
      try {
        // console.log("prev:",date);
        let newDate = date.split(' ').join('T');
        newDate = newDate + '+05:30';
        // console.log("next:",newDate);
        newDate = new Date(newDate);
        return newDate;
      }
      catch (e) {
        return new Date();
      }
    }
    else {
      return new Date();
    }
  }

  setCurrentRadioPath(url, title) {
    try {
      const re = /visual=true/;
      url = url.replace(re, '');
      this.currentRadioPath = this.safeUrl(url + '&auto_play=true');
      this.currentRadioName = title;
      this.radioPlaying = true;
    }
    catch (e) { }
  }

  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  safeTrustUrl(url) {
    return this._sanitizer.bypassSecurityTrustUrl(url);
  }

}
