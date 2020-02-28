import {
  Component,
  OnInit,
  Inject,
  AfterViewInit,
  ViewChild,
  ElementRef,
  HostListener
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PlatformLocation } from "@angular/common";

import { DomSanitizer } from "@angular/platform-browser";
import { MdDialog, MD_DIALOG_DATA } from "@angular/material";
import { Meta, Title } from "@angular/platform-browser";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";

import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
import { SeoService } from "../../../services/seo.service";
import { DOCUMENT } from '@angular/common';
declare var Instamojo: any;
@Component({
  selector: "app-web-bundle-individual",
  templateUrl: "./web-bundle-individual.component.html",
  styleUrls: ["./web-bundle-individual.component.css"]
})
export class WebBundleIndividualComponent implements OnInit {
  seo: any;
  id: number;
  sub: any;
  bundle: any;
  itemDetails: any;
  checkStatus: any;
  articleEnd: boolean = false;  
  shareCount: number;
  payment_link: any;
  price:any;
  title:any;
  mealPlan: boolean = true;
  subForm: FormGroup;
  purpose : any;
  bndle : any;
  redirectUrl : any;
  magnifyingImage;

  openImgPop = false;

  selectedBundleId: number;
  chailangeDetails: any;
  selectedRow: Number;
  selectedRow1: Number;
  bundleDetails: any;
  @ViewChild('dataContainer') dataContainer: ElementRef;

  constructor(
    public _apiService: ApiService,
    public _commonService: CommonService,
    public _route: ActivatedRoute,
    public _router: Router,
    public _sanitizer: DomSanitizer,
    public dialog: MdDialog,
    public meta: Meta,
    public seoTitle: Title,
    public location: PlatformLocation,
    public _apiSeo: SeoService,
    private form: FormBuilder
  ) {}
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
          console.log(this.bundle);
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
  getBundleDetails(bundle, index) {
    this.chailangeDetails = '';
    this.bundleDetails = bundle;
    this.selectedRow1 = null;
    this.selectedRow = index;
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
    WebBundleIndividualComponent.prototype.confirmSuccess(response.paymentId);
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




  setNavigationUrl() {
    this._commonService.navUrl = "/bundle-individual/" + this.bundle.id;
  }
  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  getUserId(){
    let user = localStorage.getItem('user');
    if(user){
      return JSON.parse(user).id;
    }
    else{
      return null;
    }
  }

  clickMagnify(event) {

    this.openImgPop = true;
    setTimeout(() => {
        const popImg = document.getElementById('img-pop-src');
        console.log(document.getElementById('img-pop-src'));
        popImg['src'] = event.target.parentNode.parentNode.children[0].currentSrc;
    }, 1000);

  }

  closeImgPop() {
    this.openImgPop = false;
  }

}
