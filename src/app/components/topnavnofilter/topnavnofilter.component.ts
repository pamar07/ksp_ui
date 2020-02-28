import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';
import { ValidateService } from '../../services/validate.service';
import { MdDialog, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-topnavnofilter',
  templateUrl: './topnavnofilter.component.html',
  styleUrls: ['./topnavnofilter.component.css']
})
export class TopnavnofilterComponent implements OnInit {

  showSearchPanel: boolean;
  trendingTags: any;
  searchType: string;

  subscribe_email: string;
  mealplan_news: boolean;
  regular_news: boolean;

  constructor(
    public _apiService: ApiService,
    public _commonService: CommonService,
    public _validateService: ValidateService,
    public _router: Router,
    public dialog: MdDialog
  ) {
    this.showSearchPanel = false;
    this.searchType = "ALL";
    this.subscribe_email = '';
    this.mealplan_news = true;
    this.regular_news = true;
  }

  ngOnInit() {
    this._apiService.getEventTrendingTags().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.trendingTags = $ret.data.tag;
        if (this.trendingTags.length > 5) {
          this.trendingTags.slice(0, 5);
        }
      } else {
        this.trendingTags = [];
      }
    }, err => {
    });
  }

  logoutUser() {
    this._apiService.logoutAPI().subscribe(ret => {
      if (this._apiService.logoutUserData()) {
        this._router.navigate(['']);
      }
    });
  }

  search(text: string) {
    $('#sidenav-overlay').removeClass('dim');
    $('.mobile-search').toggleClass('hide');
    this._router.navigate(['/search-result/' + text]);
  }

  subscribe() {
    let email;
    if (!this._apiService.loggedIn()) {
      email = this.subscribe_email;
    }
    else {
      email = this._apiService.getAuthUser().email;
    }
    if (!this._validateService.validateEmail(email)) {
      let dialogRef = this.dialog.open(TopnavSocialNofilterSubscribeDialog, { data: 'Sorry, you have entered an invalid email address!' });
      //this._flashMessagesService.show('Invalid Email!', { cssClass: 'error-message',timeout: 3000 });
      return false;
    }
    if (!this.mealplan_news && !this.regular_news) {
      let dialogRef = this.dialog.open(TopnavSocialNofilterSubscribeDialog, { data: 'Please select the type of newsletter you want to be subscribed' });
      return false;
    }
    else {
      let news_type;
      if (this.mealplan_news && !this.regular_news) {
        news_type = 1;
      }
      else if (!this.mealplan_news && this.regular_news) {
        news_type = 2;
      }
      else if (this.mealplan_news && this.regular_news) {
        news_type = 3;
      }
      this._apiService.subscribeNewsletter(email, news_type).subscribe(ret => {
        let $ret = ret.status;
        console.log($ret);
        if (!this._apiService.loggedIn()) {
          this.subscribe_email = '';
        }
        if ($ret == "subscribed") {
          let dialogRef = this.dialog.open(TopnavSocialNofilterSubscribeDialog, { data: 'Thank you for subscribing...' });
        }
        else if ($ret == 400) {
          let dialogRef = this.dialog.open(TopnavSocialNofilterSubscribeDialog, { data: 'Email id is already subscribed' });
        }
        else {
          let dialogRef = this.dialog.open(TopnavSocialNofilterSubscribeDialog, { data: $ret });
        }
      }, err => {
      });
    }
  }

}



@Component({
  selector: 'dialog-messages',
  templateUrl: './dialog-messages.html',
})
export class TopnavSocialNofilterSubscribeDialog {
  constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}
