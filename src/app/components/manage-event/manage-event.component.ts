import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../services/api.service';




@Component({
  selector: 'manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.css'],
})
export class ManageEventComponent implements OnInit {

	type:any;
	tab:any;
	list:any[] = [];
	isEventLoaded:any;
	
	/* Pagination */ 
	paginations:number[] = [];
  totalCount:number;
  isPrevious:boolean;
  isNext:boolean;
  currentPage:number;
  noOfPaginations:number;
  limit:number;
  
  constructor(public _route: ActivatedRoute, public _apiService:ApiService) {
  	this.type = _route.snapshot.data.type;
  	this.noOfPaginations = 5;
    this.limit = 10;
    this.tab = 'submitted';
    this.isEventLoaded = false;
  }

  ngOnInit() {
  	this.getUserEvents(1,this.type, this.tab);
  }

  getUserEvents(page, type, status) {
  	if(this.currentPage != page || this.tab != status) {
	  	this.isEventLoaded = false;
	  	this.currentPage = page;
	    this.tab = status;
	    let reqData = {
	      type: type,
	      status: status,
	      offset: (page - 1) * this.limit,
	      limit: this.limit 
	    }; 
	    
	    this._apiService.getEventsByUser(reqData).subscribe(response=>{
	      let $ret = response.ret;
	      if($ret.code == 1) {
	        this.list = $ret.data;
	        this.totalCount = $ret.count;
	        this.isPrevious = true;
	        this.isNext     = true;
	        this.currentPage = page;
	        this.noOfPaginations = 5;
	        
	        if(Math.ceil(this.totalCount/this.limit)<=this.noOfPaginations){
	          this.noOfPaginations = Math.ceil(this.totalCount/this.limit);
	        }

	        if(page == 1){
	          this.isPrevious = false;
	          this.paginations = [];
	          for(let i=1; i<=this.noOfPaginations; i++){
	            this.paginations[i-1] = i;
	          }
	        } else if(page >= this.noOfPaginations){
	          for(let i=1; i<=this.noOfPaginations; i++){
	            this.paginations[i-1] = page-this.noOfPaginations+i;;
	          }
	        }

	        if(page == Math.ceil(this.totalCount/this.limit)){
            this.isNext = false;
          }
	      }
	      this.isEventLoaded = true;
	    },err=>{
	    	this.isEventLoaded = true;
	      this.list = [];
	    });
	  }
  }
}
