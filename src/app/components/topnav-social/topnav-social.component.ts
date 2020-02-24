import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';
import { ValidateService } from '../../services/validate.service';
import { MdDialog, MD_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-topnav-social',
  templateUrl: './topnav-social.component.html',
  styleUrls: ['./topnav-social.component.css']
})
export class TopnavSocialComponent implements OnInit {

  cityList: any;
  ageGroups: any;

  cityName: any;

  showSearchPanel: boolean;
  searchType: string;
  trendingTags: any;

  subscribe_email: string;
  mealplan_news: boolean;
  regular_news: boolean;

  @Output() city = new EventEmitter();
  @Output() age = new EventEmitter();

  constructor(
    public _apiService: ApiService,
    public _commonService: CommonService,
    public _validateService: ValidateService,
    public _router: Router,
    public dialog: MdDialog
  ) {
    this.cityList = [];
    this.showSearchPanel = false;
    this.searchType = 'ALL';
    this.subscribe_email = '';
    this.mealplan_news = true;
    this.regular_news = true;
  }

  ngOnInit() {
    const myinterval = 24 * 60 * 60 * 1000; // 15 min interval
    setInterval(function () {
      localStorage.removeItem('selectedCities');
    }, myinterval);

    if (localStorage.getItem('selectedCities')) {

      this.cityList = JSON.parse(localStorage.getItem('selectedCities'));
    } else {
      this._apiService.getCities().subscribe(ret => {
        let $ret = ret.ret;
        if ($ret.code == 1) {
          this.cityList = $ret.data;
          if (localStorage.getItem('selectedCities') != null) {
            this.cityList = JSON.parse(localStorage.getItem('selectedCities'));
          }
          if (this._apiService.loggedIn()) {
            for (let i = 0; i < this.cityList.length; i++) {
              if (this._apiService.getAuthUser().city == this.cityList[i].city) {
                this.cityList[i].checked = true;
              }
            }
          } else {
            for (let i = 0; i < this.cityList.length; i++) {
              this.cityList[i].checked = false;
            }
            if (localStorage.getItem('selectedCities') != null) {
              this.cityList = JSON.parse(localStorage.getItem('selectedCities'));
            }
          }
          this.city.emit(this.cityList.filter(item => item.checked == true));
          this.getCheckedCity();
        } else {
          this.cityList = [];
        }
      }, err => {

      });
    }

    this._apiService.getAgeGroups().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        this.ageGroups = $ret.data;
        for (let i = 0; i < this.ageGroups.length; i++) {
          this.ageGroups[i].checked = false;
        }
        if (localStorage.getItem('selectedAges') != null) {
          this.ageGroups = JSON.parse(localStorage.getItem('selectedAges'));
        }
        if (this._apiService.loggedIn()) {
          this._apiService.getUserProfileDetails().subscribe(ret => {
            let $ret = ret.ret;
            if ($ret.code == 1) {
              let user_data = $ret.data.user;
              let child_data = $ret.data.children;
              try {
                if (user_data.family_status == 1) {
                  this.ageGroups[0].checked = true;
                } else if (user_data.family_status == 2) {
                  this.ageGroups[1].checked = true;
                } else {
                  for (let j = 0; j < child_data.length; j++) {
                    let child_dob = this.calculateAge(child_data[j].dateofbirth);
                    if (child_dob.type == 3) {
                      this.ageGroups[2].checked = true;
                    } else if (child_dob.type == 2) {
                      if (child_dob.age < 6) {
                        this.ageGroups[2].checked = true;
                      } else if (child_dob.age < 12) {
                        this.ageGroups[3].checked = true;
                      }
                    } else {
                      if (child_dob.age < 2) {
                        this.ageGroups[4].checked = true;
                      } else if (child_dob.age < 4) {
                        this.ageGroups[5].checked = true;
                      } else if (child_dob.age < 6) {
                        this.ageGroups[6].checked = true;
                      } else if (child_dob.age < 8) {
                        this.ageGroups[7].checked = true;
                      } else if (child_dob.age < 12) {
                        this.ageGroups[8].checked = true;
                      } else if (child_dob.age < 19) {
                        this.ageGroups[9].checked = true;
                      } else {
                        this.ageGroups[10].checked = true;
                      }
                    }
                  }
                  this.ageGroups[10].checked = true;
                }
              } catch (e) { }
              let parent_flag = false;

              for (let i = 2; i < 10; i++) {
                if (this.ageGroups[i].checked) {
                  parent_flag = true;
                  break;
                }
              }
              if (parent_flag) {
                this.ageGroups[10].checked = true;
              } else {
                this.ageGroups[10].checked = false;
              }
              if (this.ageGroups.filter(item => item.checked == true).length > 0) {
                this.age.emit(this.ageGroups.filter(item => item.checked == true));
              }
            }
          }, err => {
          });

        } else {
          let parent_flag = false;
          for (let i = 2; i < 10; i++) {
            if (this.ageGroups[i].checked) {
              parent_flag = true;
              break;
            }
          }
          if (parent_flag) {
            this.ageGroups[10].checked = true;
          } else {
            this.ageGroups[10].checked = false;
          }
          if (this.ageGroups.filter(item => item.checked == true).length > 0) {
            this.age.emit(this.ageGroups.filter(item => item.checked == true));
          }
        }
      } else {
        this.ageGroups = [];
      }
    }, err => {

    });

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
  setCity(city_id) {
    console.log(city_id);
    this.cityList[city_id].checked = !this.cityList[city_id].checked;
    this.city.emit(this.cityList.filter(item => item.checked == true));
    localStorage.setItem('selectedCities', JSON.stringify(this.cityList));
  }

  setAge(age_id) {
    this.ageGroups[age_id].checked = !this.ageGroups[age_id].checked;
    let parent_flag = false;
    for (let i = 2; i < 10; i++) {
      if (this.ageGroups[i].checked) {
        parent_flag = true;
        break;
      }
    }
    if (parent_flag) {
      this.ageGroups[10].checked = true;
    } else {
      this.ageGroups[10].checked = false;
    }
    if (this.countCheckedAges() != 0) {
      localStorage.setItem('selectedAges', JSON.stringify(this.ageGroups));
    } else {
      if (localStorage.getItem('selectedAges') != null) {
        localStorage.removeItem('selectedAges');
      }
    }
    this.age.emit(this.ageGroups.filter(item => item.checked == true));
  }

  countCheckedCities() {
    // if(this._apiService.loggedIn()){
    let count = 0;
    for (let i = 0; i < this.cityList.length; i++) {
      if (this.cityList[i].checked == true) {
        count++;
      }
    }
    return count;
    // }
    // else{
    //   return 2;
    // }
  }

  countCheckedAges() {
    // if(this._apiService.loggedIn()){
    let count = 0;
    for (let i = 0; i < this.ageGroups.length; i++) {
      if (this.ageGroups[i].checked == true && i != 10) {
        count++;
      }
    }
    return count;
    // }
    // else{
    //   return 0;
    // }
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  getCheckedCity() {
    this.cityName = 'Cities';
    // this.cityList = JSON.parse(localStorage.getItem('city'));
    for (let i = 0; i < this.cityList.length; i++) {
      if (this.cityList[i].checked == true) {
        this.cityName = this.cityList[i].city;
        break;
      }
    }
    return this.cityName;
  }

  calculateAge(birthday) {
    let today = new Date();
    birthday = new Date(birthday);

    let diff = Math.floor(today.getTime() - birthday.getTime());
    let day = 1000 * 60 * 60 * 24;

    let days = Math.floor(diff / day);
    let months = Math.floor(days / 31);
    let years = Math.floor(months / 12);

    let age: any;
    let type: any = 1; /* 1:year, 2:month, 3:day */
    if (years > 0) {
      age = years;
      days = days - months * 31;
      months = months - years * 12;
    }
    if (months > 0 && years == 0) {
      age = months;
      type = 2;
    }
    if (days > 0 && months == 0 && years == 0) {
      age = days;
      type = 3;
    }
    let ageInfo: any = {
      'age': age,
      'type': type
    };
    return ageInfo;
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
    } else {
      email = this._apiService.getAuthUser().email;
    }
    if (!this._validateService.validateEmail(email)) {
      let dialogRef = this.dialog.open(TopnavSocialSubscribeDialog, { data: 'Sorry, you have entered an invalid email address!' });
      return false;
    }
    if (!this.mealplan_news && !this.regular_news) {
      let dialogRef = this.dialog.open(TopnavSocialSubscribeDialog,
        { data: 'Please select the type of newsletter you want to be subscribed' });
      return false;
    } else {
      let news_type;
      if (this.mealplan_news && !this.regular_news) {
        news_type = 1;
      } else if (!this.mealplan_news && this.regular_news) {
        news_type = 2;
      } else if (this.mealplan_news && this.regular_news) {
        news_type = 3;
      }
      this._apiService.subscribeNewsletter(email, news_type).subscribe(ret => {
        let $ret = ret.status;
        console.log($ret);
        if (!this._apiService.loggedIn()) {
          this.subscribe_email = '';
        }
        if ($ret == 'subscribed') {
          let dialogRef = this.dialog.open(TopnavSocialSubscribeDialog, { data: 'Thank you for subscribing...' });
        } else if ($ret == 400) {
          let dialogRef = this.dialog.open(TopnavSocialSubscribeDialog, { data: 'Email id is already subscribed' });
        } else {
          let dialogRef = this.dialog.open(TopnavSocialSubscribeDialog, { data: $ret });
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
export class TopnavSocialSubscribeDialog {
  constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}
