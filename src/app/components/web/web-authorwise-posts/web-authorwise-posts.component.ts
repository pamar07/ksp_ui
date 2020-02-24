import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-web-authorwise-posts',
  templateUrl: './web-authorwise-posts.component.html',
  styleUrls: ['./web-authorwise-posts.component.css']
})
export class WebAuthorwisePostsComponent implements OnInit {

  id: number;
  articles: any;
  author: any;

  paginations: number[] = [];
  totalCount: number;
  isPrevious: boolean;
  isNext: boolean;
  currentPage: number;
  noOfItems: number;
  noOfPaginations: number;

  constructor(
    public _apiService: ApiService,
    public _commonService: CommonService,
    public _sanitizer: DomSanitizer,
    public _router: Router,
    public _route: ActivatedRoute
  ) {
    this.articles = [];
    this.noOfItems = 12;
    this.noOfPaginations = 9;
  }

  ngOnInit() {
    this._route
      .params
      .subscribe(params => {
        this.id = params['id'] || 0;

        this._apiService.getAuthorwisePosts(this.id, 1, 12).subscribe(ret => {
          let $ret = ret.ret;
          if ($ret.code == 1) {
            this.author = $ret.data;
            this.articles = $ret.data.articles;
            this.totalCount = $ret.data.articleCount;
            try {
              this.author.about_yourself = this.author.about_yourself.split("<a ").join("<a style='color:#e45b80;!important;'");
            }
            catch (e) { }
            this.author.about_yourself = this.safeHtml(this.author.about_yourself);
            this.isPrevious = false;
            this.isNext = true;
            this.currentPage = 1;
            if (Math.ceil(this.totalCount / this.noOfItems) <= this.noOfPaginations) {
              this.noOfPaginations = Math.ceil(this.totalCount / this.noOfItems);
            }
            for (let i = 1; i <= this.noOfPaginations; i++) {
              this.paginations[i - 1] = i;
            }
          }
        }, err => {
        });
      });
      if (this.id == 128315) {
        // $('#images-pro').css('transform', 'rotate(90deg)');
        console.log(document.getElementById('images-pro'));
        if (document.getElementById('images-pro')) {
          console.log(document.getElementById('images-pro'));
          document.getElementById('images-pro').style.display = 'none';
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
      this._apiService.getAuthorwisePosts(this.id, pageNo, this.noOfItems).subscribe(ret => {
        let $ret = ret.ret;
        if ($ret.code == 1) {
          this.articles = $ret.data.articles;
        }
      }, err => {
      });
    }
  }

  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

}
