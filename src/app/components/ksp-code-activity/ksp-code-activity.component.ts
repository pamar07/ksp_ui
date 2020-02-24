import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { log } from 'util';

declare var $: any;

@Component({
  selector: 'ksp-code-activity',
  templateUrl: './ksp-code-activity.component.html',
  styleUrls: ['./ksp-code-activity.component.css']
})
export class kspCodeActivityComponent implements OnInit {

  codeForm: FormGroup;
  notifyFor: any = '';
  src: any;
  boxArray = [];
  private itemArray: any[][];
  itemsrc: any;
  mobPattern = new RegExp(/^[1-9][0-9]{4,12}$/);
  emailPattern = new RegExp(/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i);
  latestArticles: any;
  isLatestLoaded: boolean = false;
  links: any;
  paymentLink: any;
  lateArticles: any;
  isLateLoaded: boolean = false;
  boxArra = [];
  bannersrc: any;
  merchantArray: any = [];
  merArra: any = [];
  imageurl2: any;
  imageurl: any;
  constructor(
    public _apiService: ApiService,
    private form: FormBuilder,
    public _router: Router,

  ) { }

  ngOnInit() {
    const hash = window.location.hash;
    console.log(hash);
    if (hash === '#merchandise') {
      // alert('hello');
      // using ES6 template string syntax
      $(`[data-toggle="tab"][href="${hash}"]`).trigger('click');
    }
    this.codeForm = this.form.group({
      'email': [null, [Validators.required, Validators.pattern(this.emailPattern)]],
      'mobile': [null, [Validators.required, Validators.pattern(this.mobPattern)]],
    });
    this.updateLatestArticle();
    this.updateLateArticle();
    this._apiService.intentCaptureCommon('', 'shop', 'view', '').subscribe(ret => {
      console.log(ret);
    }, err => {
    });
  }

  updateLateArticle() {
    // this._apiService. kspShopContents().subscribe(ret=>{
    //   let $ret = ret.ret;
    //   if($ret.code == 0){
    //     console.log($ret.result[0].item_details);
    //     for (let i = 0; i < $ret.result.length; i++) {
    //       if ($ret.result[i].type == 0) {
    //         this.boxArra.push($ret.result[i]);
    //     this.boxArra = this.boxArra.slice(0, 1);
    //       }
    //       if ($ret.result[i].type == 1) {
    //         this.merArra.push($ret.result[i]);
    //     this.merArra = this.boxArra.slice(0, 1);
    //       }
    //     }
    //     this.boxArra = $ret.result;
    //     this.boxArra = this.boxArra.slice(0, 1);
    //     this.isLateLoaded = true;
    //   }else{
    //     this.lateArticles = [];
    //   }
    // },err=>{
    // });
  }
  updateLatestArticle() {
    this._apiService.kspShopContents().subscribe(ret => {
      let $ret = ret.ret;
      console.log($ret);
      if ($ret.code == 0) {
        for (let i = 0; i < $ret.result.length; i++) {

          this.imageurl2 = $ret.result[i].box_image;
          let haystack = this.imageurl2;
          let needle = '/';
          let replacement = '/w_' + 400 + '/';
          haystack = Array.from(haystack).reverse().join('');
          needle = Array.from(needle).reverse().join('');
          replacement = Array.from(replacement).reverse().join('');
          haystack = haystack.replace(needle, replacement);
          const results = Array.from(haystack).reverse().join('');
          $ret.result[i].box_image = results;

          if ($ret.result[i].type == 0) {
            this.boxArray.push($ret.result[i]);
            this.src = $ret.result[0].box_image;
          } else if ($ret.result[i].type == 1) {
            this.merchantArray.push($ret.result[i]);
          }
        }

      } else {
        this.latestArticles = [];
      }
    }, err => {
    });
  }

  payLink(link) {
    this._apiService.intentCaptureCommon('', 'shop', 'click', link).subscribe(ret => {
      console.log(ret);
    }, err => {
    });
    if (this._apiService.loggedIn()) {
      localStorage.setItem('kspshop', '1');
    } else {
      this._router.navigate(["/login"]);
    }
  }

  showNotifyPopup(type) {
    this.notifyFor = type;
    $('#code-con').modal('show');
  }
  checkEmailOrPhone(type) {
    if (type == 'email') {
      if (this.codeForm.controls.email.value && this.codeForm.controls.email.value != '') {
        this.codeForm.get('mobile').setValidators([Validators.pattern(this.mobPattern)]);
      } else {
        this.codeForm.get('mobile').setValidators([Validators.required]);
      }
      this.codeForm.controls.mobile.updateValueAndValidity();

    } else if (type == 'phone') {
      if (this.codeForm.controls.mobile.value && this.codeForm.controls.mobile.value != '') {
        this.codeForm.get('email').setValidators([Validators.pattern(this.emailPattern)]);
      } else {
        this.codeForm.get('email').setValidators([Validators.required, Validators.pattern(this.emailPattern)]);
      }
      this.codeForm.controls.email.updateValueAndValidity();
    }
  }

  submitCodePopup(data) {
    this._apiService.kspCodeContactRequest({ email: data.email, mobile: data.mobile, type: this.notifyFor }).subscribe(ret => {
      $('#code-con').modal('hide');
    }, err => { });
  }
}
