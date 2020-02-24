import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';

declare var $ :any;
@Component({
  selector: 'app-saved-images',
  templateUrl: './saved-images.component.html',
  styleUrls: ['./saved-images.component.css']
})
export class SavedImageComponent implements OnInit {

  images:any;
  paginations:number[] = [];
  totalCount:number;
  isPrevious:boolean;
  isNext:boolean;
  currentPage:number;
  noOfItems:number;
  noOfPaginations:number;
  isImageLoaded:boolean = false; 
  event_pic:any;
  imageError:any;
  
  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _sanitizer: DomSanitizer,
    public _route: ActivatedRoute
  ) {
    this.noOfItems = 12;
    this.noOfPaginations = 5;
  }

  ngOnInit() {
    this._apiService.getUserSavedImages(this.noOfItems,1).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.images = $ret.data.images;
        this.totalCount = $ret.data.count;
        this.isPrevious = false;
        this.isNext = true;
        this.currentPage = 1;
        
        if(Math.ceil(this.totalCount/this.noOfItems)<=this.noOfPaginations){
          this.noOfPaginations = Math.ceil(this.totalCount/this.noOfItems);
        }
        for(let i=1; i<=this.noOfPaginations; i++){
          this.paginations[i-1] = i;
        }
        this.isImageLoaded = true;
      }else{
        this.images = [];
        this.isImageLoaded = true;
      }
    },err=>{
    });
  }

  getNewPage(pageNo){
    if(pageNo < 1){
      this.isPrevious = false;
    
    } else if(pageNo>Math.ceil(this.totalCount/this.noOfItems)){
        this.isNext = false;
    
    } else {
      this.currentPage = pageNo;
      this.isPrevious = true;
      if(pageNo==1){
        this.isPrevious = false;
      }
      if(pageNo==Math.ceil(this.totalCount/this.noOfItems)){
        this.isNext = false;
      } else{
        this.isNext = true;
      }
      if(pageNo>=this.noOfPaginations){
        for(let i=1; i<=this.noOfPaginations; i++){
          this.paginations[i-1] = pageNo-this.noOfPaginations+i;
        }
      }
      this.isImageLoaded = false;
      this._apiService.getUserSavedImages(this.noOfItems,pageNo).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.images = $ret.data.images;
          this.isImageLoaded = true;
        }
      },err=>{
      });
    }
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      
      if(file.size<=(1024*1024*5)){
        if(file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/png'){
          let user = this._apiService.getAuthUser();
          this._apiService.uploadSavePicture(file, user.id).subscribe(ret=>{
            let $ret = ret.ret;
            if($ret.code == 1){
              this.images.unshift($ret.data);
            }else{
              this.imageError = 'Sorry, some network error occur. Please try after sometime.';
              $('#image-error').modal('show');        
            }
          },err=>{
          });
        }
        else{
          this.imageError = 'Please upload .jpg or .jpeg or .png type file only.';
          $('#image-error').modal('show');
        }
      }
      else{
        this.imageError = 'File size should not be more than 1 Mb.';
        $('#image-error').modal('show');
      }
    }
  }
}
