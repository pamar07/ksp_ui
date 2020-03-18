import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-likecomment',
  templateUrl: './likecomment.component.html',
  styleUrls: ['./likecomment.component.css']
})
export class LikecommentComponent implements OnInit {

  @Input() loveData: any = [];
  @Input() entityType: any;
  @Input() entityId: any;
  @Input() loveCount: number;
  @Input() commentCount: number;
  @Input() isBlack: boolean;
  @Input() isSmall: boolean;
  @Input() permaLink: any;

  @Output() loveDone = new EventEmitter();

  isLoved: boolean = false;
  loveHoverText: string;

  base_share_url: any;
  fb_link: any;
  twitter_link: any;
  whatsapp_link: any;
  pinterest_link: any;
  google_link: any;
  linkedin_link: any;

  constructor(
    public _apiService: ApiService,
    public _commonService: CommonService,
    public _router: Router,
    public _route: ActivatedRoute,
    public _sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this._route
      .params
      .subscribe(params => {
        if (this.loveData) {
          if (this.loveData.length > 0) {
            this.isLoved = true;
            this.loveHoverText = 'You already love this post';
          }  else {
            this.loveHoverText = 'Let us know if you love this post';
          }
        }
        this.base_share_url = environment.share_url;
        this.createFbLink();
        this.createTwitterLink();
        this.createWhatsappLink();
        this.createGoogleLink();
        this.createPinterestLink();
        this.createLinkedinLink();
      });
  }

  doLove() {
    if (this._apiService.loggedIn()) {
      this._apiService.doLove(this.entityType, this.entityId).subscribe(ret => {
        let $ret = ret.ret;
        if ($ret.code == 1) {
          this.isLoved = !this.isLoved;
          if (this.isLoved) {
            this.loveCount++;
            this.loveHoverText = 'You already love this post';
          }
          else {
            this.loveCount--;
            this.loveHoverText = 'Let us know if you love this post';
          }
          this.loveDone.emit(this.isLoved);
        }
        else {
        }
      }, err => {
      });
    }
    else {
      this._commonService.setNavigationUrl(this.entityType, this.entityId, this.permaLink);
    }
  }

  getPageUrl() {
    let dynamicUrl: string = '';
    if (this.entityType == 'post' || this.entityType == 'banner') {
      dynamicUrl = "/article-individual/" + this.entityId;
    }
    else if (this.entityType == 'videos' || this.entityType == 'ksp-tv') {
      dynamicUrl = "/tv-individual/" + this.entityId;
    }
    else if (this.entityType == 'ksp-radio') {
      dynamicUrl = "/radio-individual/" + this.entityId;
    }
    else if (this.entityType == 'social-group') {
      dynamicUrl = "/post-individual/" + this.entityId;
    }
    else if (this.entityType == 'event') {
      dynamicUrl = "/event-individual/" + this.entityId;
    }
    return dynamicUrl;
  }

  createFbLink() {
    this.fb_link = "https://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=" + this.base_share_url;
    let dynamicUrl = this.getPageUrl();
    this.fb_link = this.fb_link + dynamicUrl;
    //this.fb_link = this.safeUrl(this.fb_link);
    //this.fb_link = this.fb_link + "&redirect_uri=http://35.154.204.200/ksp_uat" + dynamicUrl;
  }

  createTwitterLink() {
    this.twitter_link = "https://twitter.com/intent/tweet?url=" + this.base_share_url;
    let dynamicUrl = this.getPageUrl();
    this.twitter_link = this.twitter_link + dynamicUrl;
    //this.twitter_link = this.safeUrl(this.twitter_link);
  }

  createWhatsappLink() {
    this.whatsapp_link = "whatsapp://send?text=" + this.base_share_url;
    let dynamicUrl = this.getPageUrl();
    this.whatsapp_link = this.whatsapp_link + dynamicUrl;
    this.whatsapp_link = this.safeUrl(this.whatsapp_link);
  }

  createPinterestLink() {
    this.pinterest_link = "https://pinterest.com/pin/create/bookmarklet/?url=" + this.base_share_url;
    let dynamicUrl = this.getPageUrl();
    this.pinterest_link = this.pinterest_link + dynamicUrl;
  }

  createGoogleLink() {
    this.google_link = "https://plus.google.com/share?url=" + this.base_share_url;
    let dynamicUrl = this.getPageUrl();
    this.google_link = this.google_link + dynamicUrl;
  }

  createLinkedinLink() {
    this.linkedin_link = "https://www.linkedin.com/shareArticle?url=" + this.base_share_url;
    let dynamicUrl = this.getPageUrl();
    this.linkedin_link = this.linkedin_link + dynamicUrl;
  }

  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustUrl(url);
  }
}
