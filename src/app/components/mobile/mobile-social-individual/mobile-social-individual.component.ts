import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {MdDialog, MD_DIALOG_DATA} from '@angular/material';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

declare var addThisObj: any;

@Component({
  selector: 'app-mobile-social-individual',
  templateUrl: './mobile-social-individual.component.html',
  styleUrls: ['./mobile-social-individual.component.css']
})
export class MobileSocialIndividualComponent implements OnInit {

  id:number;
  sub:any;
  groupIndividual:any;
  trendinggroups:any;

  safeContent:any = [];
  show_read_more:any = [];
  post_read_more:any = [];

  loggedInUserId:any = 0;
  editPostId:any;
  editedPostTitle:any;
  editedPostContent:any;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _route: ActivatedRoute,
    public _router:Router,
    public _sanitizer: DomSanitizer,
    public dialog:MdDialog
  ) { }

  ngOnInit() {
    this._route
      .params
      .subscribe(params => {
        this.id = params['id'] || 0;
        this._apiService.getIndividualgroup(this.id).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.data.length==0 || $ret.data[0].content_status==0){
            this._router.navigate(['/home']);
          }
          if($ret.code == 1){
            addThisObj.refresh();
            this.groupIndividual = $ret.data[0];
            this.groupIndividual.excerpt = this.groupIndividual.excerpt.split("\r\n").join("<br/>");
            for(let i=0; i<this.groupIndividual.posts.length; i++){
              /*this.groupIndividual.posts[i].content = this.groupIndividual.posts[i].content.split("sphinx.xelpmoc.in:8000/ksp").join("i2.wp.com/www.kidsstoppress.com");
              this.groupIndividual.posts[i].content = this.groupIndividual.posts[i].content.split("\r\n\r\n").join("<br/><br/>");
              this.groupIndividual.posts[i].content = this.groupIndividual.posts[i].content.split("\r\n\t").join("");
              this.groupIndividual.posts[i].content = this.groupIndividual.posts[i].content.split("\r\n").join("<br/>");*/
              this.groupIndividual.posts[i].safeContent = this.safeHtml(this.groupIndividual.posts[i].content);
              if(this.htmlToPlaintextCount(this.groupIndividual.posts[i].safeContent) >= 100){
                this.show_read_more[i] = false;
              }
              else{
                this.show_read_more[i] = true;
              }
              this.post_read_more[i] = false;
            }

            this._apiService.getUserProfileDetails().subscribe(ret=>{
              let $ret = ret.ret;
              if($ret.code == 1){
                this.loggedInUserId = $ret.data.user.id;
              }
            });
          }
        },err=>{
        });
        this._apiService.getTrendingGroups(4).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.trendinggroups = $ret.data;
          }
        },err=>{
        });
      });
  }

  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  join(group_id,group_name){
    let dialogRef = this.dialog.open(MobileGroupJoinIndividualPageDialog,{data:group_name});
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this._apiService.joinGroup(group_id).subscribe(ret=>{
          let $ret = ret.ret;
          console.log($ret);
          if($ret.code == 1){
            this.updatePage();
          }else{
          }
        },err=>{
        });
      }
    });

  }

  updatePage(){
    this._apiService.getIndividualgroup(this.id).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.data.length==0){
        this._router.navigate(['/home']);
      }
      if($ret.code == 1){
        this.groupIndividual = $ret.data[0];
        this.groupIndividual.excerpt = this.groupIndividual.excerpt.split("\r\n").join("<br/>");
        for(let i=0; i<this.groupIndividual.posts.length; i++){
          this.groupIndividual.posts[i].safeContent = this.safeHtml(this.groupIndividual.posts[i].content);
          if(this.htmlToPlaintextCount(this.groupIndividual.posts[i].safeContent) >= 100){
            this.show_read_more[i] = false;
          }
          else{
            this.show_read_more[i] = true;
          }
          this.post_read_more[i] = false;
        }
      }
    },err=>{
    });
    this._apiService.getTrendingGroups(4).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.trendinggroups = $ret.data;
      }
    },err=>{
    });
  }

  getUserName(){
    let user = localStorage.getItem('user');
    if(user){
      return JSON.parse(user).name;
    }
    else{
      return null;
    }
  }

  leaveGroup(group_id,group_name){
    let dialogRef = this.dialog.open(MobileGroupLeaveIndividualPageDialog,{data:group_name});
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this._apiService.leaveGroup(group_id).subscribe(ret=>{
          let $ret = ret.ret;
          console.log("Here",$ret);
          if($ret.code == 1){
            this.updatePage();
          }else{
          }
        },err=>{
        });
      }
    });
  }

  deleteSocialPost(post_id,post_title){
    let dialogRef = this.dialog.open(MobilePostAlterGroupIndividualPageDialog,{data:"You are going to delete the post <br/> <b>" + post_title + "</b>"});
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this._apiService.deleteSocialPost(post_id).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.updatePage();
          }else{
          }
        },err=>{
        });
      }
    });
  }

  editSocialPost(post_index,post_id,post_title){
    this.editPostId = post_id;
    let allPosts = this.groupIndividual.posts.slice().reverse();
    this.editedPostTitle = allPosts[post_index].title;
    this.editedPostContent = allPosts[post_index].content;
  }

  saveEditedPost(){
    if(this.editedPostTitle!='' && this.editedPostContent!=''){
      let dialogRef = this.dialog.open(MobilePostAlterGroupIndividualPageDialog,{data:"You are going to update the post <br/> <b>" + this.editedPostTitle + "</b>"});
      dialogRef.afterClosed().subscribe(result => {
        if(result == true){
          this._apiService.updateSocialPost(this.editPostId,this.editedPostTitle,this.editedPostContent).subscribe(ret=>{
            let $ret = ret.ret;
            if($ret.code == 1){
              this.updatePage();
            }else{
            }
          },err=>{
          });
        }
      });
    }
  }

  htmlToPlaintextCount(text) {
    return text ? String(text).replace(/<[^>]+>/gm, '').length : 0;
  }

  zoomImageToggle(){
    $('#zoom-img').toggleClass('hide');
    $('#zoom-img-dim').toggleClass('hide');
  }

}

@Component({
 selector: 'dialog-messages',
 templateUrl: './dialog-messages.html',
})
export class MobileGroupJoinIndividualPageDialog {
 constructor(
   @Inject(MD_DIALOG_DATA) public data: any
 ) { }
}


@Component({
 selector: 'dialog-messages-leave',
 templateUrl: './dialog-messages-leave.html',
})
export class MobileGroupLeaveIndividualPageDialog {
 constructor(
   @Inject(MD_DIALOG_DATA) public data: any
 ) { }
}

@Component({
 selector: 'dialog-messages-leave',
 templateUrl: './dialog-messages-post-alter.html',
})
export class MobilePostAlterGroupIndividualPageDialog {
 constructor(
   @Inject(MD_DIALOG_DATA) public data: any
 ) { }
}
