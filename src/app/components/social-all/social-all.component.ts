import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-social-all',
  templateUrl: './social-all.component.html',
  styleUrls: ['./social-all.component.css']
})
export class SocialAllComponent implements OnInit {

  id:number;
  sub:any;
  groups:any;
  paginations:number[] = [];
  totalCount:number;
  isPrevious:boolean;
  isNext:boolean;
  currentPage:number;
  noOfItems:number;
  noOfPaginations:number;

  join_status:string;
  group_join_status:boolean = true;

  constructor(
    public _apiService:ApiService,
    public _sanitizer: DomSanitizer,
    public _router:Router
  ) {
    this.noOfItems = 6;
    this.noOfPaginations = 9;
    this.join_status = 'JOIN';
  }

  ngOnInit() {
      this._apiService.getAllGroupsPagewise(1,this.noOfItems).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.groups = $ret.data.groups;
          this.totalCount = $ret.data.total_groups;
          this.isPrevious = false;
          this.isNext = true;
          this.currentPage = 1;
          if(Math.ceil(this.totalCount/this.noOfItems)<=this.noOfPaginations){
            this.noOfPaginations = Math.ceil(this.totalCount/this.noOfItems);
          }
          for(let i=1; i<=this.noOfPaginations; i++){
            this.paginations[i-1] = i;
          }
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
      this._apiService.getAllGroupsPagewise(pageNo,this.noOfItems).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.groups = $ret.data.groups;
        }
      },err=>{
      });
    }
  }

  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  join(group_id){
    console.log(group_id);
    if(this._apiService.loggedIn()){
      this._apiService.joinGroup(group_id).subscribe(ret=>{
        let $ret = ret.ret;
        console.log($ret);
        if($ret.code == 1){
          this.join_status = 'REQUEST SENT';
        }else{
        }
      },err=>{
      });
    }
    else{
      this._router.navigate(['/login']);
    }
  }

}
