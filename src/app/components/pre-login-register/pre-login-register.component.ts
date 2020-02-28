import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/pairwise';

import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-pre-login-register',
  templateUrl: './pre-login-register.component.html',
  styleUrls: ['./pre-login-register.component.css']
})
export class PreLoginRegisterComponent implements OnInit {

  constructor(
    public _router:Router,
    public _apiService:ApiService,
    public _commonService:CommonService
  ) { }
  type:any;
  
  ngOnInit() {
    let navUrlType;
    let entityId;
    let entityType;
    let navUrlStrArr = this._commonService.navUrl.split('/');

    console.log(navUrlStrArr);
    if(navUrlStrArr.length === 4){
      navUrlType = navUrlStrArr[1];
      entityId = navUrlStrArr[3];
      if(navUrlType == "article-individual"){
        entityType = "post";
        this.type = 'article-'+entityId;
        this._apiService.intentCapture(entityId,entityType,this._commonService.navUrl).subscribe(ret=>{
          console.log(ret);
        });
      }
      else if(navUrlType == "tv-individual"){
        entityType = "videos";
        this.type = 'videos-'+entityId;
        this._apiService.intentCapture(entityId,entityType,this._commonService.navUrl).subscribe(ret=>{
          console.log(ret);
        });
      }
      else if(navUrlType == "radio-individual"){
        entityType = "ksp-radio";
        this.type = 'radio-'+entityId;
        this._apiService.intentCapture(entityId,entityType,this._commonService.navUrl).subscribe(ret=>{
          console.log(ret);
        });
      }
      else if(navUrlType == "post-individual"){
        entityType = "social-group";
        this.type = 'group-'+entityId;
        this._apiService.intentCapture(entityId,entityType,this._commonService.navUrl).subscribe(ret=>{
          console.log(ret);
        });
      }
      else if(navUrlType == "event-individual"){
        entityType = "event";
        this.type = 'event-'+ entityId;
        this._apiService.intentCapture(entityId,entityType,this._commonService.navUrl).subscribe(ret=>{
          console.log(ret);
        });
      } 
    } else if(navUrlStrArr.length === 3){
      navUrlType = navUrlStrArr[1];
      entityId = navUrlStrArr[2];
      if(navUrlType == "article-individual"){
        entityType = "post";
        this.type = 'article-'+entityId;
        this._apiService.intentCapture(entityId,entityType,this._commonService.navUrl).subscribe(ret=>{
          console.log(ret);
        });
      }
      else if(navUrlType == "tv-individual"){
        entityType = "videos";
        this.type = 'videos-'+entityId;
        this._apiService.intentCapture(entityId,entityType,this._commonService.navUrl).subscribe(ret=>{
          console.log(ret);
        });
      }
      else if(navUrlType == "radio-individual"){
        entityType = "ksp-radio";
        this.type = 'radio-'+entityId;
        this._apiService.intentCapture(entityId,entityType,this._commonService.navUrl).subscribe(ret=>{
          console.log(ret);
        });
      }
      else if(navUrlType == "post-individual"){
        entityType = "social-group";
        this.type = 'group-'+entityId;
        this._apiService.intentCapture(entityId,entityType,this._commonService.navUrl).subscribe(ret=>{
          console.log(ret);
        });
      }
      else if(navUrlType == "event-individual"){
        entityType = "event";
        this.type = 'event-'+ entityId;
        this._apiService.intentCapture(entityId,entityType,this._commonService.navUrl).subscribe(ret=>{
          console.log(ret);
        });
      } 
      else if(navUrlType == "awards"){
        entityType = "awards";
        this.type = 'awards/' + entityId;
        this._apiService.intentCapture(entityId, entityType, this._commonService.navUrl).subscribe(ret => {
          console.log(ret);
        });
      } 
    } else {
      navUrlType = navUrlStrArr[1];
      entityId = navUrlStrArr[2];
      console.log(navUrlType);
      if(navUrlType == "awards"){
        entityType = "awards";
        this.type = 'awards/5';
        this._apiService.intentCapture('5', entityType, this._commonService.navUrl).subscribe(ret => {
          console.log(ret);
        });
      }
    }

  }

  gotoRegister(){
    console.log( this.type)
    if(this.type){
      this._router.navigate(['/signup', {c: this.type}]);
    } else {
      this._router.navigate(['/signup']);
    }
  }

  gotoLogin(){
    this._router.navigate(['/login']);
  }

}
