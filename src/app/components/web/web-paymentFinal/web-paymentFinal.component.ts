import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxCarousel } from 'ngx-carousel';
// import "assets/award2017/js/jquery-2.1.0.min.js";
import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';
import { DOCUMENT } from '@angular/common';

declare var $: any;

@Component({
    selector: 'app-web-paymentFinal',
    templateUrl: './web-paymentFinal.component.html',
    styleUrls: ['./web-paymentFinal.component.css'],
    providers: [DatePipe]
  })
  export class webPaymentFinal implements OnInit {
    redirecturl: any;
    bundle_id: any;
    bundleId:any;

    constructor(
        public _api: ApiService
    ) { 
        
     }

    ngOnInit() {
        this.redirecturl = location.href.split('&')[1].split('=')[1];
        if(this.redirecturl === 'Credit'){
            if(localStorage.getItem('kspshop') === '1'){
                $('#paymentDetailsShop').modal('show');
                localStorage.removeItem('kspshop');
            }else if(localStorage.getItem('kspcode') === '1'){
                localStorage.removeItem('kspcode');
                $('#paymentDetailsCode').modal('show');
            }else{
                this.bundleId = localStorage.getItem('bundle_id');
                $('#paymentDetails').modal('show');
            }
            
        }
        else{
            this.bundleId = localStorage.getItem('bundle_id');
            $('#paymentDetailsFai').modal('show');
        }
    }


    viewBundle(){
        location.href=this._api.getShareUrlPay()+'bundle-individual/'+this.bundleId;
    }
    viewShop(){
        location.href=this._api.getShareUrlPay()+'ksp-code-activity';
    }
    viewCode(){
        location.href=this._api.getShareUrlPay()+'ksp-code';
    }

  }