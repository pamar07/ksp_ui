import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MdDialog, MD_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Meta, Title } from "@angular/platform-browser";
import { FormGroup, FormBuilder, Validators, FormControl ,FormArray } from '@angular/forms';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';
import { SeoService } from '../../../services/seo.service';

declare var mapObj: any;
declare var addThisObj: any;
declare var instaEmbedObj: any;
declare var $:any;

@Component({
  selector: 'app-web-event-individual',
  templateUrl: './web-event-individual.component.html',
  styleUrls: ['./web-event-individual.component.css'],
  providers: [DatePipe]
})
export class WebEventIndividualComponent implements OnInit {


  id:number;
  sub:any;
  eventIndividual:any;
  events:any;
  participate_status:string;
  isBookmarked:boolean = false;
  bookmarkHoverText:string;
  shareCount:number;
  user_comment:any = "";
  user_comment_error:any;
  replyComment:any;
  user_comment_reply_error:any;
  user_comment_reply:any = "";
  showReply:any = [];

  promotions:any;
  promotionInsideContentTop:any;
  promotionInsideContentBottom:any;
  advertisement:number;
  eventEnd:boolean = true;
  registerMsg:any = '';
  cityList:any = [];
  currentDate: any;

  eventRegister: FormGroup;
  mobPattern = new RegExp(/^[1-9][0-9]{4,12}$/);
  emailPattern = new RegExp(/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i);

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _route: ActivatedRoute,
    public _router:Router,
    public _sanitizer: DomSanitizer,
    public dialog:MdDialog,
    public _pipe: DatePipe,
    public meta: Meta,
    public title: Title,
    private form:FormBuilder,
    public _apiSeo: SeoService
  ) {
    this.participate_status = 'PARTICIPATE';
    this.bookmarkHoverText = '';
    this.shareCount = 0;
  }

  ngOnInit() {

    this.eventRegister = this.form.group({
      'name':[null, Validators.required],
      'email':[null, [Validators.required, Validators.pattern(this.emailPattern)]],
      'number': [null, [Validators.required, Validators.pattern(this.mobPattern)]],
      'city':["", [Validators.required]]
    });

    let today = new Date();
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1;
    const yyyy: any = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if ( mm < 10) {
        mm = '0' + mm;
    }
    this.currentDate = yyyy + '-' + mm + '-' + dd;
    console.log(this.currentDate);
    this._route.params.subscribe(params => {
      this.id = params['id'] || 0;
      
      /* Get Event Data */ 
      this._apiService.getIndividualEvent(this.id).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.data.length==0){
          this._router.navigate(['/home']);
        }
        if($ret.code == 1){
          addThisObj.refresh();
          instaEmbedObj.load();
          this.eventIndividual = $ret.data;
          this.eventIndividual.content = this.eventIndividual.content.split("\r\n").join("<br/>");
          this.eventIndividual.content = this.eventIndividual.content.split("<p").join("<p style=\"margin:0!important;\"");
          this.eventIndividual.content = this.safeHtml(this.eventIndividual.content);
          
          this.advertisement = 0;
          this.eventEnd =false;

          if(this.eventIndividual.restrict_flag==1 && !this._apiService.loggedIn()){
            this._commonService.setNavigationUrl('event',this.eventIndividual.id,this.eventIndividual.perma_link);
          }
          this.title.setTitle(this.eventIndividual.title);
          let url = 'www.kidsstoppress.com/event-individual/'+this.eventIndividual.perma_link+'/'+this.eventIndividual.id;
          this._apiSeo.createLinkForCanonicalURL(url);

          /*Calculate share count*/
          this._apiService.getShareCount(this._apiService.share_url + 'event-individual/' + this.eventIndividual.id).subscribe(ret_share=>{
            if(this.eventIndividual.shares != null){
              this.shareCount = ret_share.shares + this.eventIndividual.shares;
            }
            else{
              this.shareCount = ret_share.shares;
            }
          });

          let latArr = [];
          let lngArr = [];
          for(let cnt=0;cnt<this.eventIndividual.event_venue_details.length;cnt++){
            let latlng = this.eventIndividual.event_venue_details[cnt].google_map_address.slice(1,-1).split(',');
            latArr[cnt] = latlng[0];
            lngArr[cnt] = latlng[1];
          }
          mapObj.loadMapMultiMarker(latArr,lngArr);
          this.events = $ret.related_events;

          if(this.eventIndividual.bookmarked.length>0){
            this.isBookmarked = true;
            this.bookmarkHoverText = 'You already bookmarked';
          }
          else{
            this.isBookmarked = false;
            this.bookmarkHoverText = 'Click here to bookmark';
          }

          this._apiService.pageviewCapture(this.eventIndividual.id,'event','/event-individual/'+this.eventIndividual.id).subscribe(ret2=>{
            //console.log(ret2);
          });
        }
      },err=>{
      });

      /* Get Promotions */
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

    });

    /* Get cities. */ 
    this._apiService.getCities().subscribe(ret=>{
      let $ret = ret.ret;        
      if($ret.code == 1){
        this.cityList = $ret.data;
        
      } else {
        this.cityList = [];
      }
    },err=>{
    });
  }

  participate(){
    let dialogRef = this.dialog.open(ParticipateConfirmDialog,{data:'You are going to participate in this event'});
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        if(this._apiService.loggedIn()){
          this._apiService.participateEvent(this.eventIndividual.id).subscribe(ret=>{
            let $ret = ret.ret;
            if($ret.code == 1){
              this.eventIndividual.participated = 1;
              let dialogRef = this.dialog.open(ParticipatedDialog,{data:'Thank you for participating this event...'});
            }else{
            }
          },err=>{
          });
        }
        else{
          // this._router.navigate(['/login']);
          this._commonService.setNavigationUrl('event',this.eventIndividual.id,this.eventIndividual.perma_link);
        }
      }
    });
  }

  doBookmark(entityType,entityId){
    if(this._apiService.loggedIn()){
      this._apiService.doBookmark(entityType,entityId).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.isBookmarked = !this.isBookmarked;
          if(this.isBookmarked){
            this.eventIndividual.total_bookmarks++;
            this.bookmarkHoverText = 'You already bookmarked';
          }
          else{
            this.eventIndividual.total_bookmarks--;
            this.bookmarkHoverText = 'Click here to bookmark';
          }
        }
      },err=>{
      });
    }
    else{
      // this._router.navigate(['/pre-login-register']);
      this._commonService.setNavigationUrl('event',this.eventIndividual.id,this.eventIndividual.perma_link);
    }
  }

  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  safeStyle(style) {
    return this._sanitizer.bypassSecurityTrustStyle(style);
  }

  getOnlyDate(date){
    let newDate;
    if(date!=null){
      newDate = date.split(' ').join('T')+'+05:30';
      newDate = new Date(newDate);
    }
    else{
      newDate = new Date();
    }
    return this._pipe.transform(new Date(newDate), 'yyyy-MM-dd');
  }

  doComment(){
    if(this._apiService.loggedIn()){
      if(this.user_comment==""){
        this.user_comment_error = 'You have not written any response. Please write some response.';
      } else {
        this.user_comment_error = '';
        this.user_comment = this.user_comment.split("<p>").join("<p style='margin:0px 0px 0px 0px;'>");
        this._apiService.doComment('event',this.eventIndividual.id,this.user_comment).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.user_comment = "";
            $ret.data['commentReplies'] = [];
            this.eventIndividual.comments.push($ret.data);
            this.eventIndividual.comment_count++; 
            (document.getElementById('responses') as HTMLDivElement).scrollIntoView();
          }
        },err=>{
        });
      }
    } else {
      this._commonService.setNavigationUrl('event',this.eventIndividual.id,this.eventIndividual.perma_link);
    }
  }

  doCommentReply(){
    if(this._apiService.loggedIn()){
      if(this.user_comment_reply==""){
        this.user_comment_reply_error = 'You have not written any response. Please write some response.';
      } else {
        this.user_comment_reply_error = '';
        this.user_comment_reply = this.user_comment_reply.split("<p>").join("<p style='margin:0px 0px 0px 0px;'>");
        this._apiService.doComment('event',this.eventIndividual.id,this.user_comment_reply, this.replyComment).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.user_comment_reply = "";
            let index = this.eventIndividual.comments.findIndex( item => item.id == this.replyComment);
            this.eventIndividual.comments[index].commentReplies.push($ret.data);
            this.eventIndividual.comment_count++; 
          }
        },err=>{
        });
      }
    } else {
      this._commonService.setNavigationUrl('event',this.eventIndividual.id,this.eventIndividual.perma_link);
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

  getUserName(){
    let user = localStorage.getItem('user');
    if(user){
      return JSON.parse(user).name;
    }
    else{
      return null;
    }
  }

  getAdvertisement(){
   if(!this.eventEnd){
     this.advertisement = this.advertisement + 1;
   }
  }

  // registering for event
  submitRegisterPopup(val){
    if(val.name && val.email && val.number && val.city){
      let userInfo = {
        'name' : val.name,
        'email' :val.email,
        'mobile' : val.number,
        'city': val.city,
        'event_id': this.eventIndividual.id,
        'event_title': this.eventIndividual.title
      }

      this._apiService.saveCodeLead(userInfo).subscribe(ret=>{
        let $ret = ret.ret;
        $('#registerModal').modal('hide');
        this.eventRegister.reset();  
        this.eventRegister.patchValue({email: ''});
        this.eventRegister.patchValue({name: ''});
        this.eventRegister.patchValue({number: ''});
        this.eventRegister.patchValue({city: ''});
        
        this.eventRegister.controls['name'].setErrors(null);
        this.eventRegister.controls['email'].setErrors(null);
        this.eventRegister.controls['number'].setErrors(null);
        this.eventRegister.controls['city'].setErrors(null);

        this.registerMsg = $ret.data ? $ret.data.msg : 'Sorry, There is some network error please try after sometime.';
        $('#showRegThanks').modal('show');
      },err=>{
      });

    } else {
      this.eventRegister.get('name').setValidators([Validators.required]);
      this.eventRegister.get('email').setValidators([Validators.required, Validators.pattern(this.emailPattern)]);
      this.eventRegister.get('number').setValidators([Validators.required, Validators.pattern(this.mobPattern)]);
      this.eventRegister.get('city').setValidators([Validators.required]);

      this.eventRegister.controls.name.updateValueAndValidity();
      this.eventRegister.controls.email.updateValueAndValidity();
      this.eventRegister.controls.number.updateValueAndValidity();
      this.eventRegister.controls.city.updateValueAndValidity();
    }
  }
}

@Component({
 selector: 'dialog-messages-participate-confirm',
 templateUrl: './dialog-messages-participate-confirm.html',
})
export class ParticipateConfirmDialog {
 constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}

@Component({
 selector: 'dialog-messages-participated',
 templateUrl: './dialog-messages-participated.html',
})
export class ParticipatedDialog {
 constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}
