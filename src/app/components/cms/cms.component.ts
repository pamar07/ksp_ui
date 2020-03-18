import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css']
})
export class CmsComponent implements OnInit {

  slug: any;
  title: any;
  content: any;
  testDate: any;

  articleEnd: boolean = false;
  advertisement: number;
  promotions: any;
  mobilePromo: any;

  constructor(
    public _apiService: ApiService,
    public _sanitizer: DomSanitizer,
    public _route: ActivatedRoute
  ) {
    this.title = '';
    this.content = '';
    this.testDate = '2017-09-26 12:24:55';
  }

  ngOnInit() {
    this._route
      .params
      .subscribe(params => {
        this.slug = params['slug'] || 0;
        this._apiService.getCMS(this.slug).subscribe(ret => {
          let $ret = ret.ret;
          if ($ret.code == 1) {
            this.title = $ret.data[0].title;
            this.content = $ret.data[0].content;
            try {
              this.content = this.content.split("width:").join("width:100%;");
              this.content = this.content.split("height:").join("height:auto;");
              this.content = this.content.split(" width=").join(" width=100%");
              this.content = this.content.split(" height=").join(" height=auto");
              this.content = this.safeHtml(this.content);
            }
            catch (e) { }
            this.advertisement = 0;
            this.articleEnd = false;
            window.scrollTo(0, 0);
          } else {

          }
        }, err => {

        });

        this._apiService.getPromotionDetails().subscribe(ret => {
          let $ret = ret.ret;
          if ($ret.code == 1) {
            let adevertisement = $ret.data.advertisement;
            let emailAdvertisement = $ret.data.emailAdvertisement;
            let shop = $ret.data.shop;
            let innerPromo = $ret.data.data;


            /*change the sequence of promo card: third party first then the inner promos*/
            let tmp = [];
            tmp.push.apply(tmp, adevertisement);
            tmp.push.apply(tmp, emailAdvertisement);
            tmp.push.apply(tmp, shop);
            tmp.push.apply(tmp, innerPromo);
            this.promotions = tmp;
            this.mobilePromo = tmp;
          } else {
            this.promotions = [];
            this.mobilePromo = [];
          }
        }, err => {
        });
      });
  }

  getAdvertisement() {
    if (!this.articleEnd) {
      this.advertisement = this.advertisement + 1;
    }
  }

  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
}
