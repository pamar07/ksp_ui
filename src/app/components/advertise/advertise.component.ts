import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';

declare var $:any;
@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.css']
})
export class AdvertiseComponent implements OnInit {

  @Input() add:any;

  article:any;
  nolink:any;
  userEmail:any = '';
  showSubscribeThanks:boolean = false;
  subForm: FormGroup;
  thankText:any;
  mailLink:any;
  subscription_type:any;
  popup_text:any;
  
  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _sanitizer: DomSanitizer,
    public _router:Router,
    private form:FormBuilder
  ) {
    this.nolink = 'javascript:void(0);';
  }

  ngOnInit() {
    this.nolink = this.safeUrl(this.nolink);
    if(this.add.type==3){
      this.getArticleCard(this.add.article_id);
    }

    this.subForm = this.form.group({
      'email': [null, [Validators.required, Validators.email]],
    });
  }

  getArticleCard(id){
    this._apiService.getIndividualArticle(id,0).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.article = $ret.recent;
        try{
          this.article.content = this.article.content.split("sphinx.xelpmoc.in:8000/ksp").join("i2.wp.com/www.kidsstoppress.com");
          this.article.content = this.article.content.split("www.kidsstoppress.com/wp-content").join("i2.wp.com/www.kidsstoppress.com/wp-content");
          this.article.content = this.article.content.split("\r\n\r\n").join("<br/>");
          this.article.content = this.article.content.split("\r\n\t").join("");
          this.article.content = this.article.content.split("<a ").join("<a style='color:#ff007b!important;'");
          this.article.content = this.article.content.split("<img class=\"").join("<img class=\"img-responsive ");
        }
        catch(e){}
        this.article.content = this.safeHtml(this.article.content);
        this.article.restricted_content = this.safeHtml(this.article.restricted_content);
      }
    },err=>{
    });
  }

  clickIntentCapture(link){
    if(link!=null){
      this._apiService.anyPageview(link,'promotion','click').subscribe(ret=>{
        let $ret = ret.ret;
      },err=>{
      });
    }
  }

  clickIntentCaptureShowPopup(link, text){
    if(link!=null){
      this._apiService.anyPageview(link,'promotion','click').subscribe(ret=>{
        let $ret = ret.ret;
      },err=>{
      });
    }
    this.popup_text = text;
    $('#signupAddPopup').modal('show');
  }

  viewIntentCapture(link){
    if(link!=null){
      this._apiService.anyPageview(link,'promotion','view').subscribe(ret=>{
        let $ret = ret.ret;
      },err=>{
      });
    }
  }

  checkUser(link, id, type) {
    if(link!=null){
      this._apiService.anyPageview(link,'promotion','click').subscribe(ret=>{
        let $ret = ret.ret;
      },err=>{
      });
    }
    
    if(this._apiService.loggedIn()) {
      this._router.navigate([link]);
    } else {
      this.userEmail = '';
      this.mailLink  = link;
      this.thankText = '';
      this.showSubscribeThanks = false;
      this.subscription_type = type;
      $('#getEmail'+id).modal('show');
    }
  }

  sendLinkMail(data) {
    this._apiService.sendLinkMail({email: data.email, link: this.mailLink, type: this.subscription_type}).subscribe(ret=>{
      let $ret = ret.ret;
      this.showSubscribeThanks = true;
      this.subForm.patchValue({email: ''});
      this.subForm.controls['email'].setErrors(null);
      if($ret.code == 1){
        this.thankText = $ret.data.msg;
      } else {
        this.thankText = "Sorry, Some network error occurs, Please try after some time."
      }
    },
    err => {
    });
  }
  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustUrl(url);
  }

}
