import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {MdDialog, MD_DIALOG_DATA} from '@angular/material';
import { Meta, Title } from "@angular/platform-browser";

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';
//import { FlashMessagesService } from 'angular2-flash-messages';

declare var addThisObj: any;
declare var instaEmbedObj: any;

@Component({
  selector: 'app-mobile-post-individual',
  templateUrl: './mobile-post-individual.component.html',
  styleUrls: ['./mobile-post-individual.component.css']
})
export class MobilePostIndividualComponent implements OnInit {

  id:number;
  sub:any;
  article:any;
  relatedArticles:any;
  user_comment:any = "";
  user_comment_error:any;
  showAll:boolean = false;
  isBookmarked:boolean = false;
  bookmarkHoverText:string;

  groupInfo:any;

  articleEnd:boolean = false;
  advertisement:number;

  promotions:any;
  promotionInsideContentTop:any;
  promotionInsideContentBottom:any;

  loggedInUserId:any = 0;
  editPostId:any;
  editedPostTitle:any;
  editedPostContent:any;

  replyComment:any;
  user_comment_reply_error:any;
  user_comment_reply:any = "";
  showReply:any = [];

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _route: ActivatedRoute,
    public _router:Router,
    public _sanitizer: DomSanitizer,
    //public _flashMessagesService: FlashMessagesService,
    public dialog:MdDialog,
    public meta: Meta,
    public title: Title
  ) {  }

  ngOnInit() {
    this._route
      .params
      .subscribe(params => {
        this.id = params['id'] || 0;
        this._apiService.getIndividualArticle(this.id).subscribe(ret=>{
          let $ret = ret.ret;
          if(!$ret.recent){
            this._router.navigate(['/home']);
          }
          if($ret.code == 1){
            this._apiService.getIndividualgroup($ret.recent.parent).subscribe(ret2=>{
              let $ret2 = ret2.ret;
              if($ret2.code == 1){
                this.groupInfo = $ret2.data[0];
                if(this.groupInfo.content_status==0){
                  this._router.navigate(['/home']);
                }
                else{
                  addThisObj.refresh();
                  instaEmbedObj.load();
                  this.article = $ret.recent;
                  this.title.setTitle(this.article.title);
                  this.advertisement = 0;
                  this.articleEnd =false;
                  //console.log(this.article.comments);
                  //this.relatedArticles = $ret.related_articles;
                  //this.article.content = this.article.content.split("sphinx.xelpmoc.in:8000/ksp").join("i2.wp.com/www.kidsstoppress.com");
                  //this.article.content = this.article.content.split("\r\n\r\n").join("<br/><br/>");
                  //this.article.content = this.article.content.split("\r\n\t").join("");
                  //this.article.content = this.article.content.split("\r\n").join("<br/>");
                  if(this.article.bookmarked.length>0){
                    this.isBookmarked = true;
                    this.bookmarkHoverText = 'You already bookmarked';
                  }
                  else{
                    this.isBookmarked = false;
                    this.bookmarkHoverText = 'Click here to bookmark';
                  }
                  if(this._apiService.loggedIn()){
                    this._apiService.doRead(this.article.post_type,this.article.id).subscribe(ret1=>{
                      let $ret1 = ret1.ret;
                      if($ret.code == 1){
                      }
                    },err=>{
                    });
                  }
                  this._apiService.pageviewCapture(this.article.id,this.article.post_type,'/post-individual/'+this.article.id).subscribe(ret2=>{
                    //console.log(ret2);
                  });

                  this._apiService.getUserProfileDetails().subscribe(ret=>{
                    let $ret = ret.ret;
                    if($ret.code == 1){
                      this.loggedInUserId = $ret.data.user.id;
                    }
                  });
                }
              }
            },err=>{
            });
          }
        },err=>{
        });

        this._apiService.getPromotionDetails().subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.promotionInsideContentTop  = $ret.data.innerAdds[0];
            this.promotionInsideContentBottom  = $ret.data.innerAdds[1];
          }else{
            this.promotions = [];
          }
        },err=>{
        });
      });
  }

  doComment(){
    if(this._apiService.loggedIn()){
      if(this.user_comment==""){
        this.user_comment_error = 'Please enter response.';
      } else {
        this.user_comment_error = '';
        this.user_comment = this.user_comment.split("<p>").join("<p style='margin:0px 0px 0px 0px;'>");
        this._apiService.doComment(this.article.post_type,this.article.id,this.user_comment).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.user_comment = "";
            $ret.data['commentReplies'] = [];
            this.article.comments.push($ret.data);
            this.article.comment_count++;
            (document.getElementById('responses') as HTMLDivElement).scrollIntoView();
          }
        },err=>{
        });
      }
    } else {
      this._commonService.setNavigationUrl(this.article.post_type,this.article.id,this.article.perma_link);
    }
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

  doBookmark(entityType,entityId){
    if(this._apiService.loggedIn()){
      this._apiService.doBookmark(entityType,entityId).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.isBookmarked = !this.isBookmarked;
          if(this.isBookmarked){
            this.article.bookmark_count++;
          }
          else{
            this.article.bookmark_count--;
          }
        }
      },err=>{
      });
    }
    else{
      // this._router.navigate(['/pre-login-register']);
      this._commonService.setNavigationUrl(this.article.post_type,this.article.id,this.article.perma_link);
    }
  }

  getAdvertisement(){
   //console.log("getAdvertisement triggured",this.articleEnd);
   //console.log("advertisement 0",this.advertisement);
   if(!this.articleEnd){
     this.advertisement = this.advertisement + 1;
   }
   //console.log("advertisement 1",this.advertisement);
  }

  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  safeStyle(style) {
    return this._sanitizer.bypassSecurityTrustStyle(style);
  }

  urlify(text) {
    let urlRegex = /https?:\/\/(?![^"]*(?:jpg|png|gif))[^(\&|\s|\<)]+/g;
    return text.replace(urlRegex, function(url) {
      return '<a class="pink-color" target="_blank" href="' + url + '">' + url + '</a>';
    })
  }

  deleteSocialPost(post_id,post_title){
    let dialogRef = this.dialog.open(MobilePostAlterPostIndividualPageDialog,{data:"You are going to delete the post <br/> <b>" + post_title + "</b>"});
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this._apiService.deleteSocialPost(post_id).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this._router.navigate(['/social-individual/'+this.article.parent]);
          }else{
          }
        },err=>{
        });
      }
    });
  }

  editSocialPost(){
    this.editPostId = this.article.id;
    this.editedPostTitle = this.article.title;
    this.editedPostContent = this.article.content;
  }

  saveEditedPost(){
    if(this.editedPostTitle!='' && this.editedPostContent!=''){
      let dialogRef = this.dialog.open(MobilePostAlterPostIndividualPageDialog,{data:"You are going to update the post <br/> <b>" + this.editedPostTitle + "</b>"});
      dialogRef.afterClosed().subscribe(result => {
        if(result == true){
          this._apiService.updateSocialPost(this.editPostId,this.editedPostTitle,this.editedPostContent).subscribe(ret=>{
            let $ret = ret.ret;
            if($ret.code == 1){
              this.article.title = this.editedPostTitle;
              this.article.content = this.editedPostContent;
            }else{
            }
          },err=>{
          });
        }
      });
    }
  }

  showReplyComment(id, index) {
    this.replyComment = id;
    this.user_comment_reply_error = '';
    var comment_id    = 'comment_id_'+id;
    setTimeout(function(){
      $('html, body').animate({
        scrollTop: $("#"+comment_id).offset().top -200
      }, 100);  
    }, 10);
  }

  doCommentReply(){
    if(this._apiService.loggedIn()){
      if(this.user_comment_reply==""){
        this.user_comment_reply_error = 'Please enter response.';
      } else {
        this.user_comment_reply_error = '';
        this.user_comment_reply = this.user_comment_reply.split("<p>").join("<p style='margin:0px 0px 0px 0px;'>");
        this._apiService.doComment(this.article.post_type,this.article.id,this.user_comment_reply, this.replyComment).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.user_comment_reply = "";
            let index = this.article.comments.findIndex( item => item.id == this.replyComment);
            this.article.comments[index].commentReplies.push($ret.data);
            this.article.comment_count++;
          }
        },err=>{
        });
      }
    } else {
      this._commonService.setNavigationUrl(this.article.post_type,this.article.id,this.article.perma_link);
    }
  }
}

@Component({
 selector: 'dialog-messages',
 templateUrl: './dialog-messages.html',
})
export class MobilePostCommentDialog {
 constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}

@Component({
 selector: 'dialog-messages-leave',
 templateUrl: './dialog-messages-post-alter.html',
})
export class MobilePostAlterPostIndividualPageDialog {
 constructor(
   @Inject(MD_DIALOG_DATA) public data: any
 ) { }
}
