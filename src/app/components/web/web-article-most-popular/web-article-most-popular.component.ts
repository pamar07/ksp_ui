import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-web-article-most-popular',
  templateUrl: './web-article-most-popular.component.html',
  styleUrls: ['./web-article-most-popular.component.css']
})
export class WebArticleMostPopularComponent implements OnInit {

  id:number;
  sub:any;
  articles:any;
  categoryName:string;
  paginations:number[] = [];
  totalCount:number;
  isPrevious:boolean;
  isNext:boolean;
  currentPage:number;
  noOfItems:number;
  noOfPaginations:number;
  selectedCity:any;
  selectedAge:any;
  loading:boolean;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _route: ActivatedRoute,
    public _router:Router
  ) {
    this.noOfItems = 12;
    this.noOfPaginations = 9;
    this.selectedAge = [];
    this.selectedCity = [];
    this.loading = true;
  }

  ngOnInit() {
    this.updateArticles();
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
      this.loading = true;
      this._apiService.getArticlesRecommended(pageNo,this.noOfItems,this.selectedCity,this.selectedAge).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.articles = $ret.data.recommended;
        }
        this.loading = false;
      },err=>{
        this.loading = false;
      });
    }
  }

  updateArticles(){
    this.loading = true;
    this._apiService.getArticlesRecommended(1,this.noOfItems,this.selectedCity,this.selectedAge).subscribe(ret=>{
      let $ret = ret.ret;
      console.log($ret);
      if($ret.code == 1){
        this.articles = $ret.data.recommended;
        this.totalCount = $ret.data.articleCount;
        this.isPrevious = false;
        this.isNext = true;
        this.currentPage = 1;
        if(Math.ceil(this.totalCount/this.noOfItems)<=this.noOfPaginations){
          this.noOfPaginations = Math.ceil(this.totalCount/this.noOfItems);
        }
        for(let i=1; i<=this.noOfPaginations; i++){
          this.paginations[i-1] = i;
        }
        console.log(this.articles[0]);
      }
      this.loading = false;
    },err=>{
      this.loading = false;
    });
  }

  filterCity(cityArr){
    let checkedCities:any = [];
    let index = -1;
    for(let i=0; i < cityArr.length; i++){
      checkedCities[++index] = cityArr[i].id;
    }
    this.selectedCity = checkedCities;
    this.updateArticles();
  }

  filterAge(ageArr){
    let checkedAges:any = [];
    let index = -1;
    for(let i=0; i < ageArr.length; i++){
      checkedAges[++index] = ageArr[i].id;
    }
    this.selectedAge = checkedAges;
    this.updateArticles();
  }


}
