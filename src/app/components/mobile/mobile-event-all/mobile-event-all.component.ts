import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-mobile-event-all',
  templateUrl: './mobile-event-all.component.html',
  styleUrls: ['./mobile-event-all.component.css'],
  providers: [DatePipe]
})
export class MobileEventAllComponent implements OnInit {

  allPageBanners:any;
  events:any;
  start_date:any;
  end_date:any;
  startDate:any;
  endDate:any;
  today:any;
  tomorrow:any;
  nextSaturday:any;
  nextSunday:any;
  cityList:any;
  categoryList:any;
  ageGroups:any;
  trendingTags:any;
  paginations:number[] = [];
  totalCount:number;
  isPrevious:boolean;
  isNext:boolean;
  currentPage:number;
  noOfItems:number;
  noOfPaginations:number;
  filterType:number;

  selectedCity:any;
  selectedAge:any;
  selectedCategory:any;
  selectedTag:any;

  todaySelected:boolean = false;
  tomorrowSelected:boolean = false;
  saturdaySelected:boolean = false;
  sundaySelected:boolean = false;

  isEventLoaded:boolean = false;
  tab_selected:number;

  showFilter:boolean = false;
  eventType:string = 'event';
  currentDate: any;
  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _sanitizer: DomSanitizer,
    public _pipe: DatePipe
  ) {
    this.noOfItems = 12;
    this.noOfPaginations = 5;
    this.selectedAge = [];
    this.selectedCity = [];
    this.selectedCategory = [];
    this.selectedTag = [];
    this.tab_selected = 5;
    this.allPageBanners = []
  }

  ngOnInit() {

    $(window).scroll(function() {
      if($(this).scrollTop()>5) {
         $( ".main-title-outer-fixed" ).addClass("fixed-me");
      } else {
        $( ".main-title-outer-fixed" ).removeClass("fixed-me");
      }
    });
    let today = new Date();
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1;
    const yyyy: any = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if ( mm < 10) {
        mm = '0' + mm;
    }
    this.currentDate = yyyy + '-' + mm + '-' + dd;
    console.log(this.currentDate);
    // this.start_date = new Date();
    // this.end_date = new Date();

    this.today = new Date();
    this.tomorrow = new Date();
    this.nextSaturday = this.nextDate(6);
    this.nextSunday = this.nextDate(0);
    this.tomorrow= this.tomorrow.setDate(this.tomorrow.getDate() + 1);

    let authUser = this._apiService.getAuthUser();
    if(authUser!=null){
      this.selectedCity[0] = this._apiService.getAuthUser().city;
    }

    this._apiService.advanceEventSearch(this.eventType, this.selectedCity,
      this.selectedAge,this.selectedCategory,this.noOfItems,1,this.selectedTag,this.startDate,this.endDate).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.events = $ret.data;
        this.totalCount = $ret.totalEvents;
        this.isPrevious = false;
        this.isNext = true;
        this.currentPage = 1;
        // this.start_date = '';
        // this.end_date = '';
        this.filterType = 0;
        if(Math.ceil(this.totalCount/this.noOfItems)<=this.noOfPaginations){
          this.noOfPaginations = Math.ceil(this.totalCount/this.noOfItems);
        }
        for(let i=1; i<=this.noOfPaginations; i++){
          this.paginations[i-1] = i;
        }
        this.isEventLoaded = true;
      }else{
        this.events = [];
      }
    },err=>{
    });

    this._apiService.getCities().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.cityList = $ret.data;
        if(this._apiService.loggedIn()){
          for(let i=0; i<this.cityList.length; i++){
            if(this._apiService.getAuthUser().city == this.cityList[i].city){
              this.cityList[i].checked = true;
            }
            else{
              this.cityList[i].checked = false;
            }
          }
        }
      }else{
        this.cityList = [];
      }
    },err=>{
    });

    this._apiService.showEventInterests().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.categoryList = $ret.data;
        for(let i=0; i<this.categoryList.length; i++){
          this.categoryList[i].checked = false;
        }
      }else{
        this.categoryList = [];
      }
    },err=>{
    });

    this._apiService.getAgeGroups().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.ageGroups = $ret.data;
        //this.ageGroups.splice(-1,1);
        for(let i=0; i<this.ageGroups.length; i++){
          this.ageGroups[i].checked = false;
        }
      }else{
        this.ageGroups = [];
      }
    },err=>{
    });

    this._apiService.getEventTrendingTags().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.trendingTags = $ret.data.tag;
        for(let i=0; i<this.trendingTags.length; i++){
          this.trendingTags[i].checked = false;
        }
      }else{
        this.trendingTags = [];
      }
    },err=>{
    });

    this._apiService.getAllPageBanners(this._commonService.noOfAllPageBanners).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.allPageBanners = $ret.data;
      }else{
        this.allPageBanners = [];
      }
    },err=>{
    });

  }

  getNewPage(pageNo){
    if(pageNo<1){
      this.isPrevious = false;
    }
    else if(pageNo>Math.ceil(this.totalCount/this.noOfItems)){
        this.isNext = false;
    }
    else{
      this.currentPage = pageNo;
      this.isPrevious = true;
      if(pageNo==1){
        this.isPrevious = false;
      }
      if(pageNo==Math.ceil(this.totalCount/this.noOfItems)){
        this.isNext = false;
      }
      else{
        this.isNext = true;
      }
      if(pageNo>=this.noOfPaginations){
        for(let i=1; i<=this.noOfPaginations; i++){
          this.paginations[i-1] = pageNo-this.noOfPaginations+i;
        }
      }
      this.isEventLoaded = false;
      this._apiService.advanceEventSearch(this.eventType,this.selectedCity,this.selectedAge,this.selectedCategory,this.noOfItems,pageNo,this.selectedTag,this.startDate,this.endDate).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.events = $ret.data;
          this.isEventLoaded = true;
        }
      },err=>{
      });
    }
  }

  filterEventsDaywise(date,btn_id){
    try{
      let formatted_start_date = this._pipe.transform(new Date(date), 'yyyy-MM-dd') + ' 00:00:00';
      let formatted_end_date = this._pipe.transform(new Date(date), 'yyyy-MM-dd') + ' 23:59:59';
      this.startDate = formatted_start_date;
      this.endDate = formatted_end_date;
    }
    catch(e){
      this.startDate = '';
      this.endDate = '';
    }

    //this.updateEvents();
    if(btn_id == 1){ /* 1: for indicating today button is clicked*/
      this.todaySelected = !this.todaySelected;
    }
    else if(btn_id == 2){ /* 5: for indicating tomorrow button is clicked*/
      this.tomorrowSelected = !this.tomorrowSelected;
    }
    else if(btn_id == 3){ /* 5: for indicating saturday button is clicked*/
      this.saturdaySelected = !this.saturdaySelected;
    }
    else if(btn_id == 4){ /* 5: for indicating sunday button is clicked*/
      this.sundaySelected = !this.sundaySelected;
    }
    if(date){
      // this.filterEventsCategorywise();
      // this.filterEventsCitywise();
      // this.filterEventsAgewise();
      this.isEventLoaded = false;
      this._apiService.advanceEventSearch(this.eventType,this.selectedCity,this.selectedAge,this.selectedCategory,this.noOfItems,1,this.selectedTag,this.startDate,this.endDate).subscribe(ret=>{
        let $ret = ret.ret;
        if(ret.err.code == 0){
          this.events = $ret.data;
          this.totalCount = $ret.totalEvents;
          this.isPrevious = false;
          this.isNext = true;
          this.currentPage = 1;
          this.noOfPaginations = 5;
          if(Math.ceil(this.totalCount/this.noOfItems)<=this.noOfPaginations){
            this.noOfPaginations = Math.ceil(this.totalCount/this.noOfItems);
          }
          this.paginations = [];
          for(let i=1; i<=this.noOfPaginations; i++){
            this.paginations[i-1] = i;
          }
          this.isEventLoaded = true;
        }
      },err=>{
      });
    }
  }

  filterEventsDatewise(){
    this.filterType = 1;
    try{
      if(this.start_date == null || this.end_date == null){
        this.startDate = '';
        this.endDate = '';
      }
      else{
        let formatted_start_date = this._pipe.transform(new Date(this.start_date), 'yyyy-MM-dd') + ' 00:00:00';
        let formatted_end_date = this._pipe.transform(new Date(this.end_date), 'yyyy-MM-dd') + ' 23:59:59';
        this.startDate = formatted_start_date;
        this.endDate = formatted_end_date;
      }
    }
    catch(e){
      this.startDate = '';
      this.endDate = '';
    }

    //this.updateEvents();
  }

  filterEventsCitywise(){
    let checkedCities:any = [];
    let index = -1;
    for(let i=0; i < this.cityList.length; i++){
      if(this.cityList[i].checked == true){
        checkedCities[++index] = this.cityList[i].city;
      }
    }
    this.selectedCity = checkedCities;
    //this.updateEvents();
  }

  filterEventsCategorywise(){
    let checkedCategories:any = [];
    let index = -1;
    for(let i=0; i < this.categoryList.length; i++){
      if(this.categoryList[i].checked == true){
        checkedCategories[++index] = this.categoryList[i].id;
      }
    }
    this.selectedCategory = checkedCategories;
    //this.updateEvents();
  }

  filterEventsAgewise(){
    let checkedAges:any = [];
    let index = -1;
    for(let i=0; i < this.ageGroups.length; i++){
      if(this.ageGroups[i].checked == true){
        checkedAges[++index] = this.ageGroups[i].id;
      }
    }
    this.selectedAge = checkedAges;
    //this.updateEvents();
  }

  updateEvents(){
    this.filterEventsDatewise();
    this.filterEventsCategorywise();
    this.filterEventsCitywise();
    this.filterEventsAgewise();
    this.isEventLoaded = false;
    this._apiService.advanceEventSearch(this.eventType,this.selectedCity,this.selectedAge,this.selectedCategory,this.noOfItems,1,this.selectedTag,this.startDate,this.endDate).subscribe(ret=>{
      let $ret = ret.ret;
      if(ret.err.code == 0){
        this.events = $ret.data;
        this.totalCount = $ret.totalEvents;
        this.isPrevious = false;
        this.isNext = true;
        this.currentPage = 1;
        this.noOfPaginations = 5;
        if(Math.ceil(this.totalCount/this.noOfItems)<=this.noOfPaginations){
          this.noOfPaginations = Math.ceil(this.totalCount/this.noOfItems);
        }
        this.paginations = [];
        for(let i=1; i<=this.noOfPaginations; i++){
          this.paginations[i-1] = i;
        }
        this.isEventLoaded = true;
      }
    },err=>{
    });
  }


  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  safeStyle(style) {
    return this._sanitizer.bypassSecurityTrustStyle(style);
  }

  nextDate(dayIndex) {
    let date = new Date();
    date.setDate(date.getDate() + (dayIndex - 1 - date.getDay() + 7) % 7 + 1);
    return date;
  }

  getOnlyDate(date){
    let newDate;
    if(date!=null){
      newDate = date.split(' ').join('T')+'+05:30';
      newDate = new Date(newDate);
    }
    else{
      newDate = new Date();
    }
    return this._pipe.transform(new Date(newDate), 'yyyy-MM-dd');
  }

  clearFilters(){
    this.todaySelected = false;
    this.tomorrowSelected = false;
    this.saturdaySelected = false;
    this.sundaySelected = false;
    this.selectedAge = [];
    this.selectedCity = [];
    this.selectedCategory = [];
    this.start_date = null;
    this.end_date = null;
    for(let i=0; i<this.cityList.length; i++){
      this.cityList[i].checked = false;
    }
    for(let i=0; i<this.ageGroups.length; i++){
      this.ageGroups[i].checked = false;
    }
    for(let i=0; i<this.categoryList.length; i++){
      this.categoryList[i].checked = false;
    }
    this.isEventLoaded = false;
    this._apiService.advanceEventSearch(this.eventType,this.selectedCity,this.selectedAge,this.selectedCategory,this.noOfItems,1).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.noOfPaginations = 5;
        this.events = $ret.data;
        this.totalCount = $ret.totalEvents;
        this.isPrevious = false;
        this.isNext = true;
        this.currentPage = 1;
        this.start_date = null;
        this.end_date = null;
        this.filterType = 0;
        if(Math.ceil(this.totalCount/this.noOfItems)<=this.noOfPaginations){
          this.noOfPaginations = Math.ceil(this.totalCount/this.noOfItems);
        }
        for(let i=1; i<=this.noOfPaginations; i++){
          this.paginations[i-1] = i;
        }
      }else{
        this.events = [];
      }
      this.isEventLoaded = true;
    },err=>{
    });
  }

  filterEventByTag(index){
    this.selectedTag.length = 0;
    this.trendingTags[index].checked = !this.trendingTags[index].checked;
    for(let i=0; i<this.trendingTags.length; i++){
      if(this.trendingTags[i].checked){
        this.selectedTag.push(this.trendingTags[i].name);
      }
    }
    //console.log(this.selectedTag);
    this.isEventLoaded = false;
    if(this.selectedTag.length>0){
      this._apiService.advanceEventSearch(this.eventType,this.selectedCity,this.selectedAge,this.selectedCategory,this.noOfItems,1,this.selectedTag,this.startDate,this.endDate).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.events = $ret.data;
          this.totalCount = $ret.totalEvents;
          this.isPrevious = false;
          this.isNext = true;
          this.currentPage = 1;
          this.filterType = 0;
          this.noOfPaginations = 5;
          this.paginations.length = 0;
          if(Math.ceil(this.totalCount/this.noOfItems)<=this.noOfPaginations){
            this.noOfPaginations = Math.ceil(this.totalCount/this.noOfItems);
          }
          for(let i=1; i<=this.noOfPaginations; i++){
            this.paginations[i-1] = i;
          }
        }else{
          this.events = [];
        }
        this.isEventLoaded = true;
      },err=>{
      });
    }
    else{
      this._apiService.advanceEventSearch(this.eventType,this.selectedCity,this.selectedAge,this.selectedCategory,this.noOfItems,1,this.selectedTag,this.startDate,this.endDate).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.events = $ret.data;
          this.totalCount = $ret.totalEvents;
          this.isPrevious = false;
          this.isNext = true;
          this.currentPage = 1;
          this.filterType = 0;
          if(Math.ceil(this.totalCount/this.noOfItems)<=this.noOfPaginations){
            this.noOfPaginations = Math.ceil(this.totalCount/this.noOfItems);
          }
          for(let i=1; i<=this.noOfPaginations; i++){
            this.paginations[i-1] = i;
          }
        }else{
          this.events = [];
        }
        this.isEventLoaded = true;
      },err=>{
      });
    }
  }

  checkCity(id){
    for(let i=0; i<this.cityList.length; i++){
      if(id == i){
        this.cityList[i].checked = true;
      }
      else{
        this.cityList[i].checked = false;
      }
    }
  }

}
