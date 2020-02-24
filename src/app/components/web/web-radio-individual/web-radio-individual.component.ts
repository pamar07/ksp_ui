import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {MdDialog, MD_DIALOG_DATA} from '@angular/material';
import { Meta, Title } from "@angular/platform-browser";

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';
import { SeoService } from '../../../services/seo.service';
//import { FlashMessagesService } from 'angular2-flash-messages';

declare var addThisObj: any;
declare var instaEmbedObj: any;

@Component({
  selector: 'app-web-radio-individual',
  templateUrl: './web-radio-individual.component.html',
  styleUrls: ['./web-radio-individual.component.css']
})
export class WebRadioIndividualComponent implements OnInit {

  seo:any;
  id:number;
  sub:any;
  radioIndividual:any;
  relatedRadio:any;
  // trendingRadios:any;
  user_comment:any = "";
  user_comment_error:any;
  showAll:boolean = false;
  isBookmarked:boolean = false;
  bookmarkHoverText:string;
  shareCount:number;

  latestArticle:any;
  latestTv:any;
  latestRadio:any;
  recentRadios:any;
  events:any;

  articleEnd:boolean = false;
  advertisement:number;

  promotions:any;
  promotionInsideContentTop:any;
  promotionInsideContentBottom:any;

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
    public seoTitle: Title,
    public _apiSeo: SeoService
  ) {
    this.shareCount = 0;
  }

  ngOnInit() {
    this._route
      .params
      .subscribe(params => {
        this.id = params['id'] || 0;

        /* Check for survey */
        let surveyArticles:any = localStorage.getItem('surveyArticles') ? localStorage.getItem('surveyArticles') : 0;
        if(surveyArticles) {
          let artilceArr = surveyArticles.split(',');
          if(artilceArr.indexOf(this.id) !== -1) {
            localStorage.setItem('seenNestleAdd', 'yes');
          }
        } 


        /* Seo Title and Meta data starts */
        this.seo = this._route.snapshot.data.seo.ret.code == 1 ? this._route.snapshot.data.seo.ret.data : {};
        this.seoTitle.setTitle(this.seo.title);
        this.meta.updateTag({ property: 'og:title', content: this.seo.title });
        this.meta.updateTag({ property: 'og:image:alt', content: this.seo.title });
        this.meta.updateTag({ property: 'og:url', content: this.seo.url });
        this.meta.updateTag({ property: 'og:type', content: 'music.song' });
        this.meta.updateTag({ name: 'description', content: this.seo.description });
        this.meta.updateTag({ property: 'og:description', content: this.seo.description });
        this.meta.updateTag({ property: 'og:image', content: this.seo.image });
        this.meta.updateTag({ property: 'og:image:width', content: '300' });
        this.meta.updateTag({ property: 'og:image:height', content: '200' });
        this.meta.updateTag({ property: 'og:updated_time', content: this.seo.updated_at });
        this.meta.updateTag({ name: 'twitter:title', content: this.seo.title });
        this.meta.updateTag({ name: 'twitter:url', content: this.seo.url });
        this.meta.updateTag({ name: 'twitter:description', content: this.seo.description });
        this.meta.updateTag({ name: 'twitter:image', content: this.seo.image });
        /* Seo Title and Meta data ends */

        this._apiService.getIndividualRadio(this.id,12).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.data.length==0){
            this._router.navigate(['/home']);
          }
          if($ret.code == 1){
            addThisObj.refresh();
            instaEmbedObj.load();
            this.radioIndividual = $ret.data;

            let url = 'www.kidsstoppress.com/radio-individual/'+this.radioIndividual.perma_link+'/'+this.radioIndividual.id;
            this._apiSeo.createLinkForCanonicalURL(url);

            /* Add tags as keywords in meta data */
            if(this.radioIndividual.tag.map(tag => tag.name).length>0){
              this.meta.updateTag({ name: 'keywords', content: this.radioIndividual.tag.map(tag => tag.name) });
            }

            /*Calculate share count*/
            this._apiService.getShareCount(this._apiService.share_url + 'radio-individual/' + this.radioIndividual.id).subscribe(ret_share=>{
              if(this.radioIndividual.shares != null){
                this.shareCount = ret_share.shares + this.radioIndividual.shares;
              }
              else{
                this.shareCount = ret_share.shares;
              }
            });

            this.advertisement = 0;
            this.articleEnd =false;
            try{
              this.radioIndividual.excerpt = this.radioIndividual.excerpt.split("\r\n").join("<br/>");
              this.radioIndividual.content = this.radioIndividual.content.split("www.kidsstoppress.com/wp-content").join("i2.wp.com/www.kidsstoppress.com/wp-content");
              this.radioIndividual.content = this.radioIndividual.content.split("<a ").join("<a target=\"_blank\"");
              this.radioIndividual.content = this.radioIndividual.content.split("<a ").join("<a style='color:#ff007b!important;'");
              // this.radioIndividual.content = this.radioIndividual.content.split("<p").join("<p style=\"margin:0!important;\"");
            }
            catch(e){}
            this.radioIndividual.path = this.safeUrl(this.radioIndividual.path + "&auto_play=true");
            if(this.radioIndividual.bookmarked.length>0){
              this.isBookmarked = true;
              this.bookmarkHoverText = 'You already bookmarked';
            }
            else{
              this.isBookmarked = false;
              this.bookmarkHoverText = 'Click here to bookmark';
            }
            if(this._apiService.loggedIn()){
              this._apiService.doRead(this.radioIndividual.post_type,this.radioIndividual.id).subscribe(ret1=>{
                let $ret1 = ret1.ret;
                if($ret1.code == 1){
                }
              },err=>{
              });
            }
            this._apiService.pageviewCapture(this.radioIndividual.id,this.radioIndividual.post_type,'/radio-individual/'+this.radioIndividual.id).subscribe(ret2=>{
              //console.log(ret2);
            });

            this.relatedRadio = $ret.related_radio;
            for(let i=0; i<this.relatedRadio.length; i++){
              this.relatedRadio[i].path = this.safeUrl(this.relatedRadio[i].path);
            }
            this.latestRadio = $ret.latest[0];
            this.latestRadio.path = this.safeUrl(this.latestRadio.path);
            try{
              this.recentRadios = $ret.latest.slice(1);
              for(let i=0; i<this.recentRadios.length; i++){
                this.recentRadios[i].path = this.safeUrl(this.recentRadios[i].path);
              }
            }
            catch(e){}
          }
        },err=>{
        });

        this._apiService.getArticlesRecent(1,1).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.latestArticle = $ret.data.recent[0];
          }else{
            this.latestArticle = [];
          }
        },err=>{
        });

        this._apiService.getTv(1,1).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.latestTv = $ret.data[0];
            this.latestTv.path = this.safeUrl(this.latestTv.path);
          }else{
            this.latestTv = [];
          }
        },err=>{
        });

        // this._apiService.getRadio(1,13).subscribe(ret=>{
        //   let $ret = ret.ret;
        //   if($ret.code == 1){
        //     this.latestRadio = $ret.data[0];
        //     this.latestRadio.path = this.safeUrl(this.latestRadio.path);
        //     try{
        //       this.recentRadios = $ret.data.slice(1);
        //       for(let i=0; i<this.recentRadios.length; i++){
        //         this.recentRadios[i].path = this.safeUrl(this.recentRadios[i].path);
        //       }
        //     }
        //     catch(e){}
        //   }else{
        //     this.latestRadio = [];
        //   }
        // },err=>{
        // });

        this._apiService.getEventsCityAndDatewise(6,1).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.events = $ret.data;
          }else{
            this.events = [];
          }
        },err=>{
        });

        this._apiService.getPromotionDetails().subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            let adevertisement                 = $ret.data.advertisement;
            let emailAdvertisement             = $ret.data.emailAdvertisement;
            let shop                           = $ret.data.shop;
            let innerPromo                     = $ret.data.data;                
            this.promotionInsideContentBottom  = $ret.data.innerAdds;

            innerPromo = innerPromo.filter(item=> (item.article_id!=this.id));
            
            /*change the sequence of promo card: third party first then the inner promos*/
            let tmp = [];
            tmp.push.apply(tmp, adevertisement);
            tmp.push.apply(tmp, emailAdvertisement);
            tmp.push.apply(tmp, shop);
            tmp.push.apply(tmp, innerPromo);
            this.promotions = tmp;
          }else{
            this.promotions = [];
          }
        },err=>{
        });

        // this._apiService.getRadio(0,4).subscribe(ret=>{
        //   let $ret = ret.ret;
        //   if($ret.code == 1){
        //     this.trendingRadios = $ret.data;
        //   }
        // },err=>{
        // });
      });
  }

  doComment(){
    if(this._apiService.loggedIn()){
      if(this.user_comment==""){
        this.user_comment_error = 'You have not written any response. Please write some response.';
      } else {
        this.user_comment_error = '';
        this.user_comment = this.user_comment.split("<p>").join("<p style='margin:0px 0px 0px 0px;'>");
        this._apiService.doComment(this.radioIndividual.post_type,this.radioIndividual.id,this.user_comment).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.user_comment = "";
            $ret.data['commentReplies'] = [];
            this.radioIndividual.comments.push($ret.data);
            this.radioIndividual.comment_count++;
            (document.getElementById('responses') as HTMLDivElement).scrollIntoView();
          }
        },err=>{
        });
      }
    } else {
      this._commonService.setNavigationUrl(this.radioIndividual.post_type,this.radioIndividual.id, this.radioIndividual.perma_link);
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
            this.radioIndividual.bookmark_count++;
          }
          else{
            this.radioIndividual.bookmark_count--;
          }
        }
      },err=>{
      });
    }
    else{
      // this._router.navigate(['pre-login-register']);
      this._commonService.setNavigationUrl(this.radioIndividual.post_type,this.radioIndividual.id,this.radioIndividual.perma_link);
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


  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  safeStyle(style) {
    return this._sanitizer.bypassSecurityTrustStyle(style);
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
        this.user_comment_reply_error = 'You have not written any response. Please write some response.';
      } else {
        this.user_comment_reply_error = '';
        this.user_comment_reply = this.user_comment_reply.split("<p>").join("<p style='margin:0px 0px 0px 0px;'>");
        this._apiService.doComment(this.radioIndividual.post_type,this.radioIndividual.id,this.user_comment_reply, this.replyComment).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.user_comment_reply = "";
            let index = this.radioIndividual.comments.findIndex( item => item.id == this.replyComment);
            this.radioIndividual.comments[index].commentReplies.push($ret.data);
            this.radioIndividual.comment_count++;
          }
        },err=>{
        });
      }
    } else {
      this._commonService.setNavigationUrl(this.radioIndividual.post_type,this.radioIndividual.id,this.radioIndividual.perma_link);
    }
  }
}


@Component({
 selector: 'dialog-messages',
 templateUrl: './dialog-messages.html',
})
export class RadioDialog {
 constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}
