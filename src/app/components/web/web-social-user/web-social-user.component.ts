import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MD_DIALOG_DATA} from '@angular/material';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-web-social-user',
  templateUrl: './web-social-user.component.html',
  styleUrls: ['./web-social-user.component.css']
})
export class WebSocialUserComponent implements OnInit {

  allPageBanners:any;
  userGroups:any;
  popularGroups:any;
  recommendedGroups:any;

  cityList:any;
  userCity:any;
  userCityId = [];

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public dialog:MdDialog
  ) {
    this.popularGroups = [];
    this.recommendedGroups = [];
    this.allPageBanners = [];
  }

  ngOnInit() {
    this._apiService.getCities().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.cityList = $ret.data;
        let curr_user = this._apiService.getAuthUser();
        this.userCity = curr_user.city;
        console.log(this.userCity);
        for(let i=0; i<this.cityList.length; i++){
          if(this.userCity == this.cityList[i].city){
            this.userCityId.push(this.cityList[i].id);
          }
        }
        this.updateGroupPage();
      }else{
        this.cityList = [];
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

  updateGroupPage(){
    this.popularGroups.length = 0;
    this.recommendedGroups.length = 0;
    this._apiService.getUserGroups().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.userGroups = $ret.data;
        this._apiService.getMostLovedGroups(4).subscribe(ret1=>{
          let $ret1 = ret1.ret;
          if($ret1.code == 1){
            for(let i=0; i<$ret1.data.length; i++){
              let flag_popular = 0;
              for(let j=0; j<$ret.data.length; j++){
                if($ret1.data[i].id == $ret.data[j].id){
                  flag_popular = 1;
                  break;
                }
              }
              if(flag_popular == 0){
                this.popularGroups.push($ret1.data[i]);
              }
            }
            for(let i=0; i<this.popularGroups.length; i++){
              this.popularGroups[i].show = true;
            }
          }else{
            this.popularGroups = [];
          }
        },err=>{
        });

        this._apiService.getAllGroups(4, this.userCityId).subscribe(ret3=>{
          let $ret3 = ret3.ret;
          if($ret3.code == 1){
            for(let i=0; i<$ret3.data.length; i++){
              let flag_recommended = 0;
              for(let j=0; j<$ret.data.length; j++){
                if($ret3.data[i].id == $ret.data[j].id){
                  flag_recommended = 1;
                  break;
                }
              }
              if(flag_recommended == 0){
                this.recommendedGroups.push($ret3.data[i]);
              }
            }
            for(let i=0; i<this.recommendedGroups.length; i++){
              this.recommendedGroups[i].show = true;
            }
          }else{
            this.recommendedGroups = [];
          }
        },err=>{
        });
      }else{
        this.userGroups = [];
      }
    },err=>{
    });
  }

  join(group_id,group_name,group_type,group_index){
    let dialogRef = this.dialog.open(SocialUserGroupJoinDialog,{data:group_name});
    dialogRef.afterClosed().subscribe(result => {
      let dialogRes = result;
      if(result == true){
        this._apiService.joinGroup(group_id).subscribe(ret=>{
          let $ret = ret.ret;
          //console.log($ret);
          if($ret.code == 1){
            if(group_type == 1){
              this.popularGroups[group_index].show = false;
            }
            else if(group_type == 2){
              this.recommendedGroups[group_index].show = false;
            }
          }
        });
      }
    });

  }

}


@Component({
 selector: 'dialog-messages',
 templateUrl: './dialog-messages.html',
})
export class SocialUserGroupJoinDialog {
 constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}
