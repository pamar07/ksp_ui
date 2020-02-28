import { Component, OnInit,Inject, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import {MdDialog, MD_DIALOG_DATA} from '@angular/material';
import { Meta, Title } from "@angular/platform-browser";

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';
import { SeoService } from '../../../services/seo.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
//import { FlashMessagesService } from 'angular2-flash-messages';

declare var addThisObj: any;
declare var instaEmbedObj: any;
declare var twitterEmbedObj: any;
declare var $:any;
declare var Instamojo: any;
@Component({
  selector: 'app-mobile-bundle-individual',
  templateUrl: './mobile-bundle-individual.component.html',
  styleUrls: ['./mobile-bundle-individual.component.css'],
  providers: [DatePipe]
})
export class MobileBundleIndividualComponent implements OnInit {

  seo: any;
  id: number;
  sub: any;
  bundle: any;
  itemDetails: any;
  checkStatus: any;
  articleEnd: boolean = false;  
  shareCount: number;
  payment_link: any;
  mealPlan: boolean = true;
  subForm: FormGroup;

  article:any = {};
  subscribeThanaks:any = {};
  selectedBundleId: number;
  price:any;
  title:any;
  purpose : any;
  bndle : any;
  redirectUrl : any;

  @ViewChild('dataContainer') dataContainer: ElementRef;


  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _route: ActivatedRoute,
    public _router:Router,
    public _sanitizer: DomSanitizer,
    public _pipe: DatePipe,
    public dialog:MdDialog,
    public meta: Meta,
    public seoTitle: Title,
    public _apiSeo: SeoService,
    private form:FormBuilder
  ) {
    this.shareCount = 0;
    this.mealPlan = true;
  }

  ngOnInit() {
    Instamojo.configure({
      amount: 2000,
   handlers: {
     onOpen: this.onOpenHandler,
     onClose: this.onCloseHandler,
     onSuccess: this.onPaymentSuccessHandler, 
     onFailure: this.onPaymentFailureHandler
   }
 });
    // modal email for meal plan
    this.subForm = this.form.group({
      email: [null, [Validators.required, Validators.email]]
    });
    // modal email for meal plan
    this._route.params.subscribe(params => {
      this.id = params['id'] || 0;
      this._apiService.getBundleDetailsById(this.id).subscribe(
        ret => {
          let $ret = ret.ret;
          if (!$ret.data) {
            this._router.navigate(["/home"]);
          }
          this.bundle = $ret.data;
          for(let i of this.bundle.item_details){
            if(i.type == 1){
             i.image_or_video_path = i.image_or_video_path.replace("watch?v=","embed/");
            }
          }
          this.payment_link = this.bundle.payment_link;
          this.price = this.bundle.price;
          this.title = this.bundle.title;
          this.bundle.content = this.safeHtml(this.bundle.content);
          this._apiService
            .checkPaymentStatus(this.bundle.id)
            .subscribe(
              ret => {
                let $ret = ret.ret;
                this.checkStatus = $ret.data;
              },
              err => {}
            );
            this._apiService.getShareCount(this._apiService.share_url + 'bundle-individual/' + this.bundle.id).subscribe(ret_share=>{
              if(this.bundle.shares != null){
                this.shareCount = ret_share.shares + this.bundle.shares;
              }
              else{
                this.shareCount = ret_share.shares;
              }
            });
        },
        err => {}
      );
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

  
  // buyPlan(){
  //   if (this._apiService.loggedIn()) {
  //       this._apiService.submitPaymentDet(this.bundle.id,this.checkStatus).subscribe(
  //         ret => {
  //           let $ret = ret.ret;
  //           if ($ret.code == 1) {
  //             location.href = this.bundle.payment_link;
  //           }
  //         },
  //         err => {}
  //       );
  //     }
  //      else {
  //       this._router.navigate(["/login"]);
  //     }
  // }
 
  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  safeStyle(style) {
    return this._sanitizer.bypassSecurityTrustStyle(style);
  }
  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  setNavigationUrl(){
    this._commonService.navUrl = "/article-individual/" + this.bundle.id ;
  }

  zoomImageToggle(){
    $('#zoom-img').toggleClass('hide');
    $('#zoom-img-dim').toggleClass('hide');
  }

  getOnlyDate(date){
    let newDate;
    if(date!=null){
      newDate = date.split(' ').join('T');
      newDate = new Date(newDate);
    }
    else{
      newDate = new Date();
    }
    return this._pipe.transform(new Date(newDate), 'yyyy-MM-dd');
  }

 
  // for hiding the meal plan banner
  mealBanner(){
    this.mealPlan = false;
  }
  
  getBundle() {
    console.log('bundle ljwer');
    const xyz = [];
    this._apiService.getbunddle().subscribe(ret => {
      this.bundle = ret['ret'].data;
      console.log( this.bundle);
      if (this._apiService.loggedIn()) {
        for (let i = 0 ; i < this.bundle.length; i++) {
          this._apiService.checkBundlePayment({bundle_id: this.bundle[i].id}).subscribe(ret1 => {
           this.bundle[i].payment = ret1['ret'].data;
           // if (ret1['ret'].data === 1) {
           //   this.goToBundle = true;
           // } else {
           //   this.goToBundle = false;
           // }
         }, err => {
         });
      }
      console.log(this.bundle);
      }
    }, err => {
    });
  }

  submitPaymentDet(bundleId,price) {
    if (this._apiService.loggedIn()) {
      // this._api.submitPaymentDet(bundleId, status).subscribe(ret => {
      //   if (ret['ret'].code === 1) {
      //       // this._router.navigate([payment_link, '_blank']);
      //      this.document.location.href = payment_link;
           
      //   } else {
      //   }
      // this.selectedBundleId = bundleId;
      //   this._apiService.initiatePaymentStatus(this.id,'0').subscribe(ret=>{
      //       // console.log(ret);
      //       if (ret['ret'].code === 1) {
      //         localStorage.setItem('bundle_id', this.id.toString());
      //         localStorage.setItem('order_no', ret['ret'].order_id);
      //         // this._router.navigate([payment_link, '_blank']);
      //         Instamojo.open(this.payment_link+'?amount='+this.price+'&?purpose=KSP-Bundles'+this.id);
      //       //  this.document.location.href = payment_link;
            
      //     } else {
      //     }
            
         

      // }, err => {
      // });
      this.bndle = 'bundle';
      this.purpose = 'kspBundle'+bundleId;
      this.redirectUrl = this._apiService.getShareUrlPay()+'payment-statusFinal';
      this._apiService.paymentInitiate(bundleId,this.bndle,price,this.redirectUrl, this.purpose).subscribe(ret => {
        localStorage.setItem('bundle_id', bundleId);
          if(ret['ret'].code === 1){
            location.href = ret['ret'].long_url;
          }else{

          }
      })
    }
    
  }



   onOpenHandler () {
    // alert('Payments Modal is Opened');
  }

   onCloseHandler () {
    // alert('Payments Modal is Closed');
  }

   onPaymentSuccessHandler (response) {
    // alert('Payment Success');
    // this.paymentResponse = response;
    // alert(JSON.stringify(this.paymentResponse));
    MobileBundleIndividualComponent.prototype.confirmSuccess(response.paymentId);
    console.log('Payment Success Response', response);
  }

  confirmSuccess (paymentId) {
    ApiService.prototype.submitPaymentDetConfirm(this.selectedBundleId , 1, paymentId);
  }
   onPaymentFailureHandler (response) {
    // alert('Payment Failure');
    console.log('Payment Failure Response', response);
  }
 
  // Instamojo.configure({
  //   handlers: {
  //     onOpen: onOpenHandler,
  //     onClose: onCloseHandler,
  //     onSuccess: onPaymentSuccessHandler, 
  //     onFailure: onPaymentFailureHandler
  //   }
  // });
}


