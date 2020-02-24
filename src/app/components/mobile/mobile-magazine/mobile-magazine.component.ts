import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';


@Component({
  selector: 'app-mobile-magazine',
  templateUrl: './mobile-magazine.component.html',
  styleUrls: ['./mobile-magazine.component.css']
})
export class MobileMagazineComponent implements OnInit {

	pdfs:any = [];
	paginations:number[] = [];
	isPrevious:boolean;
	isNext:boolean;
	currentPage:number;
	noOfItems:number;
	noOfPaginations:number;
	totalCount:any;
	selectedCity:any;
	selectedAge:any;
	cityList: any;  	
	ageGroups:any;
	showFilter:boolean = false;
	isPdfLoaded:boolean = false;

 	constructor(
		public _apiService:ApiService,
		public _commonService:CommonService,
	){
		this.noOfPaginations = 5;
		this.noOfItems = 12;
	}
	
	ngOnInit() {  	
		this.updateMagazine();
		
		/* Get Age groups for filter. */ 
		this._apiService.getAgeGroups().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.ageGroups = $ret.data;	        
        for(let i=0; i<this.ageGroups.length; i++){
          this.ageGroups[i].checked = false;
        }
      }else{
        this.ageGroups = [];
      }
    },err=>{
    });

		/* Get cities for the filters. */ 
    this._apiService.getCities().subscribe(ret=>{
      let $ret = ret.ret;      	
    	if($ret.code == 1){
      	this.cityList = $ret.data;
      	
      	if(this._apiService.loggedIn()){
      		for(let i=0; i<this.cityList.length; i++){
        		if(this._apiService.getAuthUser().city == this.cityList[i].city){
          			this.cityList[i].checked = true;
        		} else{
          			this.cityList[i].checked = false;
        		}
      		}
      		this.filterPdfCityWise();
      	}	
			} else {
				this.cityList = [];
			}
    },err=>{
  	});

	  $(window).scroll(function() {
    	if($(this).scrollTop()>5) {
       	$( ".main-title-outer-fixed" ).addClass("fixed-me");
    	} else {
      	$( ".main-title-outer-fixed" ).removeClass("fixed-me");
    		}
  	});
	}
  
	/* Pagination */ 
	getNewPage(pageNo){			
	  if(pageNo<1){
      this.isPrevious = false;
    
    } else if(pageNo>Math.ceil(this.totalCount/this.noOfItems)){
      this.isNext = false;
    
    } else {
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
      this.isPdfLoaded = false;
      this._apiService.getPdfs(pageNo,this.noOfItems,this.selectedCity,this.selectedAge).subscribe(ret=>{	     
        let $ret = ret.ret;
        if($ret.code == 1){
          this.pdfs = $ret.data.pdfs;
          this.isPdfLoaded = true;
        }
      },err=>{
      });
    }
	}

	getCities(city) {
		let cityArr = city.split(',');
		let content = '';
		for(let x in cityArr){
			content +='<span class="ion-android-data mumbai-button all-caps marginRight">'+cityArr[x]+'</span>';
		}
		return content;
	}	

	checkCity(id){
  	for(let i=0; i<this.cityList.length; i++){
  		if(id == i){
    		this.cityList[i].checked = true;
    	} else {
    		this.cityList[i].checked = false;
    	}
  	}
	}

	filterPdfCityWise(){
  	let checkedCities:any = [];
  	let index = -1;
  	for(let i=0; i < this.cityList.length; i++){
    		if(this.cityList[i].checked == true){
      		checkedCities[++index] = this.cityList[i].city;
    		}	
  	}
  	this.selectedCity = checkedCities;
  	this.updateMagazine();
	}

	filterMagazineAgewise(){
    let checkedAges:any = [];
    let index = -1;
    for(let i=0; i < this.ageGroups.length; i++){
    	if(this.ageGroups[i].checked == true){
      	checkedAges[++index] = this.ageGroups[i].id;
    	}	
    }
    this.selectedAge = checkedAges;
    console.log(this.selectedAge);
    this.updateMagazine();
	}

	updateMagazine(){
		this.isPdfLoaded = false;
    this._apiService.getPdfs(1,this.noOfItems,this.selectedCity,this.selectedAge).subscribe(ret=>{	     
    let $ret = ret.ret;
    	if($ret.code == 1){
    		this.pdfs = $ret.data.pdfs;
    		this.isPdfLoaded = true;
    		this.totalCount = $ret.data.count;
   			this.currentPage = 1;
   			this.noOfPaginations = 5;

	   		this.paginations = [];
	   		if(Math.ceil(this.totalCount/this.noOfItems)<=this.noOfPaginations){
	    	 	this.noOfPaginations = Math.ceil(this.totalCount/this.noOfItems);
	    	}
	    	
	    	for(let i=1; i<=this.noOfPaginations; i++){
    	 		this.paginations[i-1] = i;
   			}
    	} else {
  			this.pdfs = [];
  		}
		},err=>{
		});
	}

	showPreLogin(id) {
		this._apiService.intentCapture(id,'pdf','/ksp-magazine').subscribe(ret=>{ });
		this._commonService.setNavigationUrl('pdf',id,'');
	}
}