import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MD_DIALOG_DATA} from '@angular/material';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-mobile-social-user',
  templateUrl: './mobile-social-user.component.html',
  styleUrls: ['./mobile-social-user.component.css']
})
export class MobileSocialUserComponent implements OnInit {

  allPageBanners:any;

  groups1:any;
  groups2:any;
  allUserGroups:any;
  allNonUserGroups:any;
  popularGroups:any;

  promotions:any;

  paginations:number[] = [];
  totalCount:number;
  isPrevious:boolean;
  isNext:boolean;
  currentPage:number;
  noOfItems:number;
  noOfPaginations:number;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public dialog:MdDialog
  ) {
    this.groups1 = [];
    this.groups2 = [];
    this.allNonUserGroups = [];
    this.noOfItems = 100;
    this.noOfPaginations = 9;
    this.allPageBanners = [];
  }

  ngOnInit() {

    this._apiService.getUserGroups().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.allUserGroups = $ret.data;
        if(this.allUserGroups.length>1){
          this.groups1 = this.allUserGroups.slice(0, this.allUserGroups.length/2);
          this.groups2 = this.allUserGroups.slice(this.allUserGroups.length/2, this.allUserGroups.length);
        }
        else{
          this.groups1 = this.allUserGroups;
        }
        this._apiService.getAllGroupsPagewise(1,this.noOfItems).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.allNonUserGroups = $ret.data.groups;
            for(let userGroupCount = 0; userGroupCount<this.allUserGroups.length; userGroupCount++){
              this.allNonUserGroups = this.allNonUserGroups.filter(group => group.id !== this.allUserGroups[userGroupCount].id);
            }
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
          }else{
            this.allNonUserGroups = [];
          }
        },err=>{
        });
      }else{
        this.groups1 = [];
        this.groups2 = [];
      }
    },err=>{
    });

    this._apiService.getMostLovedGroups(4).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.popularGroups = $ret.data;
      }else{
        this.popularGroups = [];
      }
    },err=>{
    });

    this._apiService.getPromotionDetails().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.promotions = $ret.data.innerAdds;
      }else{
        this.promotions = [];
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

  join(group_id,group_name){
    let dialogRef = this.dialog.open(GroupJoinSocialUserPageDialog,{data:group_name});
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this._apiService.joinGroup(group_id).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
          }else{
          }
        },err=>{
        });
      }
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
          this.allNonUserGroups = $ret.data.groups;
          for(let userGroupCount = 0; userGroupCount<this.allUserGroups.length; userGroupCount++){
            this.allNonUserGroups = this.allNonUserGroups.filter(group => group.id !== this.allUserGroups[userGroupCount].id);
          }
        }
      },err=>{
      });
    }
  }

}

@Component({
 selector: 'dialog-messages',
 templateUrl: './dialog-messages.html',
})
export class GroupJoinSocialUserPageDialog {
 constructor(
   @Inject(MD_DIALOG_DATA) public data: any
 ) { }
}
