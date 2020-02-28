import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-web-magazine',
  templateUrl: './web-magazine.component.html',
  styleUrls: ['./web-magazine.component.css']
})
export class WebMagazineComponent implements OnInit {

	ageFilter:any;
	cityFilter:any;
	city:any;
	noOfData:any;
	page:any;
	pdfs:any = [];
	paginations:number[] = [];
	isPrevious:boolean;
	isEventLoaded:boolean = false;
	isNext:boolean;
	currentPage:number;
	noOfItems:number;
	noOfPaginations:number;
	totalCount:any;
	selectedCity:any;
  	selectedAge:any;
  	isPdfLoaded:boolean = false;

 	constructor(
 		public _apiService:ApiService,
 		public _commonService:CommonService,
 	) {
  		this.noOfPaginations = 9;
   		this.noOfItems = 12;
	}
	
	ngOnInit() {  	
   		this.updateMagazine();
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
	      this.isPdfLoaded = false;
	      this._apiService.getPdfs(pageNo,this.noOfItems,this.cityFilter,this.ageFilter).subscribe(ret=>{	     
	        let $ret = ret.ret;
	        this.isPdfLoaded = true;
	        if($ret.code == 1){
	          	this.pdfs = $ret.data.pdfs;
	        } else {
	        	this.pdfs = [];
	        }
	      },err=>{
	      });
	    }
	}

	getCities(city) {
		let cityArr = city.split(',');
		let content = '';
		for(let x in cityArr){
			content +='<span class="ion-android-data mumbai-blue-button all-caps marginRight">'+cityArr[x]+'</span>';
		}
		return content;
	}

	filterCity(cityArr){
    	let checkedCities:any = [];
    	let index = -1;
    	for(let i=0; i < cityArr.length; i++){
     		 checkedCities[++index] = cityArr[i].city;
    	}
    	this.selectedCity = checkedCities;
    	this.updateMagazine();
  	}

  	filterAge(ageArr){
   		let checkedAges:any = [];
    	let index = -1;
    	for(let i=0; i < ageArr.length; i++){
      		checkedAges[++index] = ageArr[i].id;
    	}
    	this.selectedAge = checkedAges;
    	this.updateMagazine();
  	}

 	updateMagazine(){
  		this.isPdfLoaded = false;
  		this._apiService.getPdfs(1,this.noOfItems,this.selectedCity,this.selectedAge).subscribe(ret=>{	     
	        let $ret = ret.ret;
  	      	this.isPdfLoaded = true;
  	      	if($ret.code == 1){
	          	this.pdfs = $ret.data.pdfs;
	          	this.totalCount = $ret.data.count;
	         	this.currentPage = 1;
	         	this.noOfPaginations = 9;

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