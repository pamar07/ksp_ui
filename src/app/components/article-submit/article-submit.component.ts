import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';
import {MdDialog, MD_DIALOG_DATA} from '@angular/material';

declare var $ :any;

@Component({
  selector: 'app-article-submit',
  templateUrl: './article-submit.component.html',
  styleUrls: ['./article-submit.component.css']
})
export class ArticleSubmitComponent implements OnInit {

  cityList:any;
  categoryList:any;
  ageGroups:any;
  article_title:string;
  article_excerpt:string;
  article_pic:any;
  image_path:string;
  img_extsn:string;
  content:any;
  fileUploadMessage:string;
  article_tags:any;
  tags:any;
  uploadUrl:any;

  article:any;
  event_pic_editor:any;

  previewMode:boolean = false;

  accept:boolean;

  @ViewChild('ckeditor') ckeditor: any;
  constructor(
    public _apiService:ApiService,
    public dialog:MdDialog,
    public _router:Router,
    public _sanitizer: DomSanitizer
  ) {
    this.tags = [];
    this.article_title = '';
    this.article_excerpt = '';
    this.content = '';
    this.accept = false;
  }

  ngOnInit() {
    this._apiService.loadToken();
    //let upload_url = environment.upload_url + "?api_token=" + this._apiService.authToken;
    let upload_url = this._apiService.upload_url + "?api_token=" + this._apiService.authToken;
    this.uploadUrl = upload_url;

    this._apiService.getCities().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.cityList = $ret.data;
        for(let i=0; i<this.cityList.length; i++){
          this.cityList[i].checked = false;
        }
      }else{
        this.cityList = [];
      }
    },err=>{
    });

    this._apiService.getCategoryList().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.categoryList = $ret.data.filter(cat => cat.type == 0);
        for(let i=0; i<this.categoryList.length; i++){
          this.categoryList[i].checked = false;
        }
      }else{
        this.categoryList = [];
      }
    },err=>{
    });

    this._apiService.getAgeGroups().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.ageGroups = $ret.data;
        this.ageGroups.splice(-1,1);
        for(let i=0; i<this.ageGroups.length; i++){
          this.ageGroups[i].checked = false;
        }
      }else{
        this.ageGroups = [];
      }
    },err=>{

    });
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      this.fileUploadMessage = "";
      if(file.size<=(1024*1024*5)){
        if(file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/png'){
          this.fileUploadMessage = "Please wait while uploading file ...";
          this._apiService.uploadEventPicture(file).subscribe(ret=>{
            let $ret = ret.ret;
            if($ret.code == 1){
              this.image_path = $ret.data[0];
              this.img_extsn = '.' + (this.image_path.substring(this.image_path.lastIndexOf('.')+1, this.image_path.length) || this.image_path);
              this.fileUploadMessage = "File Uploaded: " + file.name;
            }else{
            }
          },err=>{
          });
        }
        else{
          let dialogRef = this.dialog.open(ArticleSubmitDialog,{data:'Please upload .jpg or .jpeg or .png type file only...'});
        }
      }
      else{
        let dialogRef = this.dialog.open(ArticleSubmitDialog,{data:'File size should not be more than 1 Mb...'});
      }
      /*this._apiService.uploadEventPicture(file).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.image_path = $ret.data[0];
          this.img_extsn = '.' + (this.image_path.substring(this.image_path.lastIndexOf('.')+1, this.image_path.length) || this.image_path);
          this.fileUploadMessage = "File Uploaded: " + file.name;
        }else{

        }
      },err=>{

      });*/
    }
  }

  previewArticle(){
    let user = JSON.parse(localStorage.getItem('user'));

    let checkedCities:any = [];
    for(let i=0; i < this.cityList.length; i++){
      if(this.cityList[i].checked == true){
        checkedCities.push(this.cityList[i].id);
      }
    }

    let checkedAgeGroups:any = [];
    for(let i=0; i < this.ageGroups.length; i++){
      if(this.ageGroups[i].checked == true){
        checkedAgeGroups.push(this.ageGroups[i].id);
      }
    }

    let checkedCategories:any = [];
    for(let i=0; i < this.categoryList.length; i++){
      if(this.categoryList[i].checked == true){
        checkedCategories.push(this.categoryList[i].id);
      }
    }

    /*for(let i=0; i<this.article_tags.length; i++){
      this.tags[i] = this.article_tags[i].value;
    }*/

    this.article = {
      'title':this.article_title,
      'excerpt':this.article_excerpt,
      'image':this.image_path,
      'content':this.content,
      'city_id':checkedCities,
      'category_id':checkedCategories,
      'age_id':checkedAgeGroups
      //'tag':this.tags
    }
    //console.log(this.article);
    if(this.article_title.toString().trim()==""){
      let dialogRef = this.dialog.open(ArticleSubmitDialog,{data:'Please provide the article title...'});
    }
    else if(this.article_excerpt.toString().trim()==""){
      let dialogRef = this.dialog.open(ArticleSubmitDialog,{data:'Please provide the article excerpt...'});
    }
    else if(this.content.toString().trim()==""){
      let dialogRef = this.dialog.open(ArticleSubmitDialog,{data:'Please provide the article content...'});
    }
    else if(checkedCities.length == 0){
      let dialogRef = this.dialog.open(ArticleSubmitDialog,{data:'Please select atleast one city related to this article...'});
    }
    else if(checkedAgeGroups.length == 0){
      let dialogRef = this.dialog.open(ArticleSubmitDialog,{data:'Please select atleast one age group related to this article...'});
    }
    else if(checkedCategories.length == 0){
      let dialogRef = this.dialog.open(ArticleSubmitDialog,{data:'Please select atleast one category related to this article...'});
    }
    else{
      this.previewMode = true;
      window.scrollTo(0,0);
    }
  }

  /*validate(){
    let checkedCities:any = [];
    for(let i=0; i < this.cityList.length; i++){
      if(this.cityList[i].checked == true){
        checkedCities.push(this.cityList[i].id);
      }
    }

    let checkedAgeGroups:any = [];
    for(let i=0; i < this.ageGroups.length; i++){
      if(this.ageGroups[i].checked == true){
        checkedAgeGroups.push(this.ageGroups[i].id);
      }
    }

    let checkedCategories:any = [];
    for(let i=0; i < this.categoryList.length; i++){
      if(this.categoryList[i].checked == true){
        checkedCategories.push(this.categoryList[i].id);
      }
    }
    if(this.article_title.toString().trim()=="" || this.article_excerpt.toString().trim()=="" || this.content.toString().trim()=="" || checkedCities.length == 0 || checkedCategories.length == 0 || checkedAgeGroups.length == 0){
      return false;
    }
    else{
      return true;
    }
  }*/

  termspage(){
    if(this.accept){
      $('#termsAndConditionpopup').modal('show');
    }
  }


  submitArticle(){
    if(this.accept==false){
      let dialogRef = this.dialog.open(ArticleSubmitDialog,{data:'Please accept Terms & Conditions and Privacy Policy of the website.'});
      return false;
    } else{ 
      this._apiService.submitArticle(this.article).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        let dialogRef = this.dialog.open(ArticleSubmitDialog,{data:'Your article has been submitted successfully.<br/>Article will be shown publicly after moderation.'});
        dialogRef.afterClosed().subscribe(result => {
            this._router.navigate(['/dashboard']);
        });
      }else{
      }
    },err=>{
    });
  }

}

    

  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  safeStyle(style) {
    return this._sanitizer.bypassSecurityTrustStyle(style);
  }

  fileChangeEditor(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      if(file.size<=(1024*1024*5)){
        if(file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/png'){
          this._apiService.uploadEventPicture(file).subscribe(ret=>{
            let $ret = ret.ret;
            if($ret.code == 1){
              try
              {
                  let link = this.ckeditor.instance.document.createElement("img");
                  link.setAttribute("alt", "Image");
                  link.setAttribute("src", $ret.data[0]);

                  this.ckeditor.instance.insertElement(link);
              }
              catch(error)
              {
                  console.log((<Error>error).message);
              }
            } else {
              alert('Some network error occur, Please try after sometime.'); 
            }
          },err=>{
          });
        }
        else{
          alert('Please upload .jpg or .jpeg or .png type file only.');
        }
      }
      else{
        alert('File size should not be more than 5 Mb.');
      }
    }
  }
  
  openImageExplorer(event) {
    $('#event_pic_editor').trigger('click');
  }

}



@Component({
 selector: 'dialog-messages',
 templateUrl: './dialog-messages.html',
})
export class ArticleSubmitDialog {
 constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}
