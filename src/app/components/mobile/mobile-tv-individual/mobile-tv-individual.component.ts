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
  selector: 'app-mobile-tv-individual',
  templateUrl: './mobile-tv-individual.component.html',
  styleUrls: ['./mobile-tv-individual.component.css']
})
export class MobileTvIndividualComponent implements OnInit {

  seo:any;
  id:number;
  sub:any;
  tvIndividual:any;
  relatedTv:any;
  // trendingTvs:any;
  user_comment:any = "";
  user_comment_error:any;
  showAll:boolean = false;
  isBookmarked:boolean = false;
  bookmarkHoverText:string;
  shareCount:number;

  latestArticle:any;
  latestTv:any;
  recentTvs:any;
  latestRadio:any;
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
    public dialog:MdDialog,
    public meta: Meta,
    public seoTitle: Title,
    public _apiSeo: SeoService
  ) {
    this.relatedTv = [];
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
        this.meta.updateTag({ property: 'og:type', content: 'video.movie' });
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

        window.scrollTo(0,0);
        this._apiService.getIndividualTv(this.id,12).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.data.length==0){
            this._router.navigate(['/home']);
          }
          if($ret.code == 1){
            addThisObj.refresh();
            instaEmbedObj.load();
            this.tvIndividual = $ret.data;

            let url = 'www.kidsstoppress.com/tv-individual/'+this.tvIndividual.perma_link+'/'+this.tvIndividual.id;
            this._apiSeo.createLinkForCanonicalURL(url);


            /* Add tags as keywords in meta data */
            if(this.tvIndividual.tag.map(tag => tag.name).length>0){
              this.meta.updateTag({ name: 'keywords', content: this.tvIndividual.tag.map(tag => tag.name) });
            }

            /*Calculate share count*/
            this._apiService.getShareCount(this._apiService.share_url + 'tv-individual/' + this.tvIndividual.id).subscribe(ret_share=>{
              if(this.tvIndividual.shares != null){
                this.shareCount = ret_share.shares + this.tvIndividual.shares;
              }
              else{
                this.shareCount = ret_share.shares;
              }
            });

            this.advertisement = 0;
            this.articleEnd =false;
            //this.trendingTvs = $ret.related_articles;
            try{
              this.tvIndividual.excerpt = this.tvIndividual.excerpt.split("\r\n").join("<br/>");
              this.tvIndividual.content = this.tvIndividual.content.split("www.kidsstoppress.com/wp-content").join("i2.wp.com/www.kidsstoppress.com/wp-content");
              this.tvIndividual.content = this.tvIndividual.content.split("<a ").join("<a target=\"_blank\"");
              this.tvIndividual.content = this.tvIndividual.content.split("<a ").join("<a style='color:#ff007b!important;'");
              this.tvIndividual.content = this.tvIndividual.content.split("width:").join("width:100%;");
              this.tvIndividual.content = this.tvIndividual.content.split("height:").join("height:auto;");
              this.tvIndividual.content = this.tvIndividual.content.split(" width=").join(" width=100%");
              this.tvIndividual.content = this.tvIndividual.content.split(" height=").join(" height=auto");
              // this.tvIndividual.content = this.tvIndividual.content.split("<p").join("<p style=\"margin:0!important;\"");
            }
            catch(e){}
            this.tvIndividual.path = this.safeUrl(this.tvIndividual.path + "?autoplay=1&mute=1&enablejsapi=1");
            if(this.tvIndividual.bookmarked.length>0){
              this.isBookmarked = true;
              this.bookmarkHoverText = 'You already bookmarked';
            }
            else{
              this.isBookmarked = false;
              this.bookmarkHoverText = 'Click here to bookmark';
            }
            if(this._apiService.loggedIn()){
              this._apiService.doRead(this.tvIndividual.post_type,this.tvIndividual.id).subscribe(ret1=>{
                let $ret1 = ret1.ret;
                //console.log($ret1);
                if($ret.code == 1){
                }
              },err=>{
              });
            }
            this._apiService.pageviewCapture(this.tvIndividual.id,this.tvIndividual.post_type,'/tv-individual/'+this.tvIndividual.id).subscribe(ret2=>{
              //console.log(ret2);
            });

            this.relatedTv = $ret.related_TV;
            for(let i=0; i<this.relatedTv.length; i++){
              this.relatedTv[i].path = this.safeUrl(this.relatedTv[i].path);
            }
            this.latestTv = $ret.latest[0];
            this.latestTv.path = this.safeUrl(this.latestTv.path);
            try{
              this.recentTvs = $ret.latest.slice(1);
              for(let i=0; i<this.recentTvs.length; i++){
                this.recentTvs[i].path = this.safeUrl(this.recentTvs[i].path);
              }
            }
            catch(e){}
          }
        },err=>{
        });

        this._apiService.getPromotionDetails().subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            let adevertisement                 = $ret.data.advertisement;
            let emailAdvertisement             = $ret.data.emailAdvertisement;
            let shop                           = $ret.data.shop;
            // let innerPromo                     = $ret.data.data;                
            this.promotionInsideContentBottom  = $ret.data.innerAdds;

            // innerPromo = innerPromo.filter(item=> (item.article_id!=this.id));
            
            /*change the sequence of promo card: third party first then the inner promos*/
            let tmp = [];
            tmp.push.apply(tmp, adevertisement);
            tmp.push.apply(tmp, emailAdvertisement);
            tmp.push.apply(tmp, shop);
            // tmp.push.apply(tmp, innerPromo);
            this.promotions = tmp;
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
        this._apiService.doComment(this.tvIndividual.post_type,this.tvIndividual.id,this.user_comment).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.user_comment = "";
            $ret.data['commentReplies'] = [];
            this.tvIndividual.comments.push($ret.data);
            this.tvIndividual.comment_count++;
            (document.getElementById('responses') as HTMLDivElement).scrollIntoView();
          }
        },err=>{
        });
      }
    } else {
      this._commonService.setNavigationUrl(this.tvIndividual.post_type,this.tvIndividual.id,this.tvIndividual.perma_link);
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
            this.tvIndividual.bookmark_count++;
          }
          else{
            this.tvIndividual.bookmark_count--;
          }
        }
      },err=>{
      });
    }
    else{
      // this._router.navigate(['/pre-login-register']);
      this._commonService.setNavigationUrl(this.tvIndividual.post_type,this.tvIndividual.id,this.tvIndividual.perma_link);
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
        this.user_comment_reply_error = 'Please enter response.';
      } else {
        this.user_comment_reply_error = '';
        this.user_comment_reply = this.user_comment_reply.split("<p>").join("<p style='margin:0px 0px 0px 0px;'>");
        this._apiService.doComment(this.tvIndividual.post_type,this.tvIndividual.id,this.user_comment_reply, this.replyComment).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.user_comment_reply = "";
            let index = this.tvIndividual.comments.findIndex( item => item.id == this.replyComment);
            this.tvIndividual.comments[index].commentReplies.push($ret.data);
            this.tvIndividual.comment_count++;
          }
        },err=>{
        });
      }
    } else {
      this._commonService.setNavigationUrl(this.tvIndividual.post_type,this.tvIndividual.id,this.tvIndividual.perma_link);
    }
  }
}

@Component({
 selector: 'dialog-messages',
 templateUrl: './dialog-messages.html',
})
export class MobileTvDialog {
 constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}
